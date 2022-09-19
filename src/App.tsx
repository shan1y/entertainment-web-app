import axios from "axios";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
  emailError: string;
  passwordErrorOne: string;
  passwordErrorTwo: string;
  handleNavigate: any;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(!!localStorage.authToken);
  const [emailError, setEmailError] = useState("");
  const [passwordErrorOne, setPasswordErrorOne] = useState("");
  const [passwordErrorTwo, setPasswordErrorTwo] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      passwordConfirm: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirm = target.passwordConfirm.value;

    if (password && passwordConfirm && password === passwordConfirm) {
      axios
        .post(signUpUrl, {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then(() => {
          navigateLogIn();
        })
        .catch((err) => {
          setEmailError(err.response.data.errors[0].msg);
        });
    }

    if (!email) {
      setEmailError("Input cannot be blank");
    } else {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email format");
      }
    }

    if (!passwordConfirm) {
      setPasswordErrorTwo("Input cannot be blank");
    } else {
      setPasswordErrorTwo("");
    }

    if (!password) {
      setPasswordErrorOne("Input cannot be blank");
    } else {
      setPasswordErrorOne("");
    }

    if (password && passwordConfirm && password !== passwordConfirm) {
      setPasswordErrorOne("Passwords do not match");
      setPasswordErrorTwo("Passwords do not match");
    }
  };

  const navigateLogIn = () => {
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    setPasswordErrorOne("");
    setPasswordErrorTwo("");
    setEmailError("");
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
        setPasswordErrorOne("");
        setIsLoggedIn(true);
        navigateHome();
      })
      .catch((error) => {
        console.log(error);
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
    emailError: emailError,
    passwordErrorOne: passwordErrorOne,
    passwordErrorTwo: passwordErrorTwo,
    handleNavigate: handleNavigate,
  };

  const logInProps: authProps = {
    title: "Log In",
    extraInput: false,
    handleSubmit: handleLogIn,
    accQuestion: "Don't have an account?",
    accSubmit: "Log in",
    linkText: "Sign Up",
    path: "/signup",
    emailError: "",
    passwordErrorOne: passwordErrorOne,
    passwordErrorTwo: passwordErrorTwo,
    handleNavigate: handleNavigate,
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
