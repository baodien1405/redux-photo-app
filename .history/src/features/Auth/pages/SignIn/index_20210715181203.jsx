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
      setIsLoading(false);
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
      const expirationTime = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
      authCtx.login(data.idToken, expirationTime.toISOString());
      history.replace("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};

function SignIn(props) {
  return (
    <div>
      <div className="text-center">
        <h2>Login Form</h2>

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
