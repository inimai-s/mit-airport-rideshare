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
  const [userId, setUserId] = useState(undefined);
  const [userFirstLastName, setUserFirstLastName] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      console.log(user._id);
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserFirstLastName(user.name);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);

    if (decodedCredential.email.endsWith('@mit.edu')){
      post("/api/login", { token: userToken }).then((user) => {
        console.log(JSON.stringify(user));
        console.log(`Here is the user name: ${user.name}`);
        console.log(`Here is the userToken: ${JSON.stringify(userToken)}`);
        console.log(`Here is the decodedCredential: ${JSON.stringify(decodedCredential)}`);
  
        setUserId(user._id);
        setUserFirstLastName(user.name);
        setUserEmail(decodedCredential.email);
        post("/api/initsocket", { socketid: socket.id });
      });
    }else{
      window.alert("Please login with an @mit.edu email!");
    }

    
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserFirstLastName(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId}/>
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <CreateARide path="/createARide/" userId={userId} userFirstLastName={userFirstLastName}/>
        <FindARide path="/findARide/" userId={userId} userFirstLastName={userFirstLastName}/>
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
