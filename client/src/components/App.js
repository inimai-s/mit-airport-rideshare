import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import { Router } from "@reach/router";

import CreateARide from "./pages/CreateARide.js";
import FindARide from "./pages/FindARide.js";

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
  const [user_email, set_user_email] = useState(undefined);
  const [user_photoLink, set_user_photoLink] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      console.log(`JSON stringify of user: ${JSON.stringify(user)}`);

      
      if (user._id) {
        // they are registed in the database, and currently logged in.
        set_user_googleid(user.user_googleid);
        set_user_name(user.user_name);
        set_user_email(user.email);
        set_user_photoLink(user.photoLink);
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
        set_user_email(decodedCredential.email);
        set_user_photoLink(decodedCredential.picture);

        post("/api/initsocket", { socketid: socket.id });
      });
    }else{
      window.alert("Please login with an @mit.edu email!");
    }

    
  };

  const handleLogout = () => {
    set_user_googleid(undefined);
    set_user_name(undefined);
    set_user_email(undefined);
    set_user_photoLink(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} user_googleid={user_googleid}/>
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} user_googleid={user_googleid} />
        <CreateARide path="/createARide/" user_googleid={user_googleid} user_name={user_name}/>
        <FindARide path="/findARide/" user_googleid={user_googleid} user_name={user_name}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
