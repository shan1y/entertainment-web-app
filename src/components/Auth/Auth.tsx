
import React from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";
import icon from "../../assets/icons/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { setLoginPassValue } from "../../stores/loginPassValueSlice";
import type { RootState } from "../../stores/store";

interface AuthProps {
  handleSubmit: (e: React.SyntheticEvent) => void;
  title: string;
  extraInput?: boolean;
  accQuestion: string;
  linkText: string;
  path: string;
  accSubmit: string;
  emailError?: string;
  passwordErrorOne?: string;
  passwordErrorTwo?: string;
  handleNavigate: (path: string) => void;
  //loginPassValue: string;
  //setLoginPassValue: (value: string) => void;
}


const Auth: React.FC<AuthProps> = ({
  handleSubmit,
  title,
  extraInput,
  accQuestion,
  linkText,
  path,
  accSubmit,
  emailError,
  passwordErrorOne,
  passwordErrorTwo,
  handleNavigate,
  // loginPassValue,
  //setLoginPassValue,
}) => {
  const loginPassValue = useSelector((state: RootState) => state.loginPassValue.value);
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLoginPassValue(e.target.value));
  };



  return (
    <section className="auth__section">
      <img className="auth__icon" src={icon} alt="icon"></img>
      <div className="auth">
        <div className="auth__card">
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              handleSubmit(e);
            }}
            className="auth__form"
          >
            <h2 className="auth__title">{title}</h2>
            <div className="auth__input-group">
              <input
                autoComplete="off"
                name="email"
                placeholder="Email Address"
                className="auth__input"
              ></input>
              {emailError ? <p className="auth__error">{emailError}</p> : null}
            </div>

            <div className="auth__input-group">
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Password"
                className="auth__input"
                 value={loginPassValue}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              ></input>
              {passwordErrorOne ? (
                <p className="auth__error">{passwordErrorOne}</p>
              ) : null}
            </div>

            {extraInput ? (
              <div className="auth__input-group">
                <input
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  className="auth__input"
                ></input>
                {passwordErrorTwo ? (
                  <p className="auth__error">{passwordErrorTwo}</p>
                ) : null}
              </div>
            ) : null}

            <button type="submit" className="auth__submit">
              {accSubmit}
            </button>
            <div className="auth__redirect">
              <h4>{accQuestion}</h4>
              <Link
                className="auth__link"
                onClick={() => {
                  handleNavigate(path);
                }}
                to={path}
              >
                <h4>{linkText}</h4>
              </Link>
            </div>
          </form>
          <div className="auth__guest">
          <p className="auth__guest-title">Guest Login</p>
          <p>email: guest@test.com</p>
          <p>password:test99</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
