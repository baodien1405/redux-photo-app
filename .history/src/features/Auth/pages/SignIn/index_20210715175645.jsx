import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SignInForm from "features/Auth/components/SignInForm";
import "./styles.scss";

SignIn.propTypes = {};

const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/photos",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const initialValues = { email: "", password: "" };

function SignIn(props) {
  return (
    <div>
      <div className="text-center">
        <h2>Login Form</h2>

        <div className="sign-in__form">
          <SignInForm initialValues={initialValues} />
        </div>

        <p>or login with social accounts</p>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn;
