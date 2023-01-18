import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";

import CreateARide from "./pages/CreateARide.js";
import FindARide from "./pages/FindARide.js";
import MyProfile from "./pages/MyProfile.js";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [user_googleid, set_user_googleid] = useState(undefined);
  const [user_name, set_user_name] = useState(undefined);
  const [email, set_email] = useState(undefined);
  const [photoLink, set_photoLink] = useState(undefined);
  const [classYear, set_classYear] = useState("Unknown");
  const [major, set_major] = useState("Unknown");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      console.log(`JSON stringify of user: ${JSON.stringify(user)}`);

      
      if (user._id) {
        // they are registed in the database, and currently logged in.
        set_user_googleid(user.user_googleid);
        set_user_name(user.user_name);
        set_email(user.email);
        set_photoLink(user.photoLink);
        set_classYear(user.classYear);
        set_major(user.major);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);

    if (decodedCredential.email.endsWith('@mit.edu')){
      post("/api/login", { token: userToken }).then((user) => {
        console.log(`Here is the userToken: ${JSON.stringify(userToken)}`);
        console.log(`Here is the decodedCredential: ${JSON.stringify(decodedCredential)}`);
  
        set_user_googleid(decodedCredential.sub);
        set_user_name(decodedCredential.name);
        set_email(decodedCredential.email);
        set_photoLink(decodedCredential.picture);

        post("/api/initsocket", { socketid: socket.id });
      });
    }else{
      window.alert("Please login with an @mit.edu email!");
    }

    
  };

  const handleLogout = () => {
    set_user_googleid(undefined);
    set_user_name(undefined);
    set_email(undefined);
    set_photoLink(undefined);
    set_classYear(undefined);
    set_major(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} user_googleid={user_googleid} photoLink={photoLink}/>
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} user_googleid={user_googleid} />
        <CreateARide path="/createARide/" user_googleid={user_googleid} user_name={user_name}/>
        <FindARide path="/findARide/" user_googleid={user_googleid} user_name={user_name}/>
        <MyProfile path="/myProfile/" user_googleid={user_googleid} user_name={user_name} email={email} photoLink={photoLink} classYear={classYear} major={major}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
