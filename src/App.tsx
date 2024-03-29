import axios from "axios";
import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(!!localStorage.authToken);
  const [emailError, setEmailError] = useState("");
  const [passwordErrorOne, setPasswordErrorOne] = useState("");
  const [passwordErrorTwo, setPasswordErrorTwo] = useState("");
  const [loginPassValue, setLoginPassValue] = useState("");
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
    if (email) {
      setEmailError("");
    }
    if (password) {
      setPasswordErrorOne("");
    }
    if (passwordConfirm) {
      setPasswordErrorTwo("");
    }

    if (password && passwordConfirm && password === passwordConfirm) {
      axios
        .post(signUpUrl, {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then((response) => {
          if (response.data.errors === "Account already exists") {
            setEmailError(response.data.errors);
          } else {
            setLoginPassValue("");
            navigateLogIn();
          }
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

    //Input validation for empty form
    if (!email) {
      setEmailError("Input cannot be blank");
    } else {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email format");
      } else {
        //update local storage with email and auth token
        if (email && password) {
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
              setEmailError(error.response.data.error);
              setPasswordErrorOne(error.response.data.error);
            });
        }
      }
    }
    if (!password) {
      setPasswordErrorOne("Input cannot be blank");
    } else {
      setPasswordErrorOne("");
    }
  };

  const appProperties: appProps = {
    searchTerm: searchTerm,
  };

  const privateProperties: privateProps = {
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    token: IsLoggedIn,
  };

  const signUpProps = {
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
    setLoginPassValue: setLoginPassValue,
    loginPassValue: loginPassValue,
  };

  const logInProps = {
    title: "Log In",
    extraInput: false,
    handleSubmit: handleLogIn,
    accQuestion: "Don't have an account?",
    accSubmit: "Log in",
    linkText: "Sign Up",
    path: "/signup",
    emailError: emailError,
    passwordErrorOne: passwordErrorOne,
    passwordErrorTwo: passwordErrorTwo,
    setLoginPassValue: setLoginPassValue,
    handleNavigate: handleNavigate,
    loginPassValue: loginPassValue,
  };

  return (
    <div className="App">
      <Routes>
        <Route element={<Auth {...signUpProps} />} path="/signup" />
        <Route element={<Auth {...logInProps} />} path="/login" />
        <Route path="*" element={<Navigate replace to="/" />} />
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
