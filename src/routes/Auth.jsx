import React, { useState } from "react";
import fbase, { firebaseInstance } from "../fbase";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
export default function Auth() {
  const onSolcialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await fbase.auth().signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <AuthForm />
      <div className="buttonContainer">
        <button className="buttonWrap" onClick={onSolcialClick} name="google">
          Continue with Google <FontAwesomeIcon icon={faGoogle} size="lg" />
        </button>
        <button className="buttonWrap" onClick={onSolcialClick} name="github">
          Continue with Github <FontAwesomeIcon icon={faGithub} size="lg" />
        </button>
      </div>
    </div>
  );
}
