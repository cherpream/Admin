/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
import "../CSS/Login.css";
import db from "../Database/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../Database/firebase";
import Parse from "parse/dist/parse.min.js";
///import { Redirect } from "react-router-dom";
//import { AuthContext } from "./Auth";

function AdminLogin() {
  const auth = getAuth(db);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [currentUser , setCurrentUser] = useState(null);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successfully!!");
      console.log(user);
      navigate("/Mission");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="bg-login">
      <div className="container">
        <div className="box-pic">
          {" "}
          <img src="/images/Logo1.png" alt="Logo" />
          <h1> SUT UPCYCLE </h1>{" "}
        </div>{" "}
        <div className="box-form">
          <h1> LOG IN </h1>{" "}
          <h6> ENTER YOUR ADMIN CODE AND PASSWORD TO ACCESS YOUR ACCOUT </h6>{" "}
          <h5> Email </h5>{" "}
          <input
            type={"email"}
            /*placeholder='Enter your email'*/
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <h5> Password </h5>
          <input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <div className="log-btn" onClick={login}>
            LOG IN{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
