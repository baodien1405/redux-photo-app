import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SignInForm from "features/Auth/components/SignInForm";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import Banner from "components/Banner";

SignIn.propTypes = {};

const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/photos",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const initialValues = { email: "", password: "" };

function SignIn(props) {
  const history = useHistory();
  const handleSubmit = (values) => {
    console.log("Value form submit: ", values);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        history.replace("/photos");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div className="text-center">
        <Banner title="Pick your amazing photo" />

        <h2>Sign In</h2>
        <div className="sign-in__form">
          <SignInForm initialValues={initialValues} onSubmit={handleSubmit} />
        </div>

        <p>or login with social accounts</p>
      </div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignIn;
