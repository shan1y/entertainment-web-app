import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth/Auth";
import Bookmarked from "./pages/Bookmarked";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import PrivateRoute from "./utils/PrivateRoute";
import { signUpUrl, loginUrl } from "./utils/api-urls";

interface appProps {
  searchTerm: string;
}

interface privateProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  token: boolean;
}

interface authProps {
  title: string;
  extraInput: boolean;
  handleSubmit: any;
  accQuestion: string;
  accSubmit: string;
  linkText: string;
  path: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(!!localStorage.authToken);
  const navigate = useNavigate();

  const handleSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    console.log(signUpUrl);
    axios
      .post(signUpUrl, {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
      });
  };

  const navigateHome = () => {
    navigate("/");
  };

  const handleLogIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    axios
      .post(loginUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.authToken = response.data.token;
        localStorage.username = email;
        setIsLoggedIn(true);
        navigateHome();
      });
  };

  const appProperties: appProps = {
    searchTerm: searchTerm,
  };

  const privateProperties: privateProps = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    token: IsLoggedIn,
  };

  const signUpProps: authProps = {
    title: "Sign Up",
    extraInput: true,
    handleSubmit: handleSignUp,
    accQuestion: "Already have an account?",
    accSubmit: "Create account",
    linkText: "Log In",
    path: "/login",
  };

  const logInProps: authProps = {
    title: "Log In",
    extraInput: false,
    handleSubmit: handleLogIn,
    accQuestion: "Don't have an account?",
    accSubmit: "Log in",
    linkText: "Sign Up",
    path: "/signup",
  };

  return (
    <div className="App">
      <Routes>
        <Route element={<Auth {...signUpProps} />} path="/signup" />
        <Route element={<Auth {...logInProps} />} path="/login" />
        <Route element={<Auth />} path="/signup" />
        <Route element={<PrivateRoute {...privateProperties} />}>
          <Route path="/" element={<Home {...appProperties} />} />
          <Route path="/movies" element={<Movies {...appProperties} />} />
          <Route path="/series" element={<Series {...appProperties} />} />
          <Route
            path="/bookmarked"
            element={<Bookmarked {...appProperties} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
