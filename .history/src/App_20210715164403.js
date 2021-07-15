import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import SignIn from "features/Auth/pages/SignIn";
import firebase from "firebase";

import "./App.scss";
import productApi from "api/productApi";
import { useDispatch } from "react-redux";
import { getMe } from "app/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// Lazy load - Code splitting
const Photo = React.lazy(() => import("./features/Photo"));

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  // const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);
        console.log(response);
      } catch (error) {
        console.log("Failed to fetch product list", error);
      }
    };

    fetchProductList();
  }, []);

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle something here
          console.log("User is not logged in");
          return;
        }
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        // Store info user login into localStorage
        localStorage.setItem(
          "firebaseui:rememberedAccounts",
          JSON.stringify(userInfo)
        );

        // Get me when signed in
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = unwrapResult(actionResult);
          console.log("Logged in user: ", currentUser);
        } catch (error) {
          console.log("Failed to login ", error.message);
        }

        // console.log("Logged in user: ", user.displayName);
        // const token = await user.getIdToken();
        // console.log("Logged in user token: ", token);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);

  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
