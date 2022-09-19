import React from "react";
import { Link } from "react-router-dom";
import "./Auth.scss";

function Auth(props: any) {
  const {
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
  } = props;
  return (
    <section className="auth__section">
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
                autoComplete="off"
                name="password"
                placeholder="Password"
                className="auth__input"
              ></input>
              {passwordErrorOne ? (
                <p className="auth__error">{passwordErrorOne}</p>
              ) : null}
            </div>
            {extraInput ? (
              <div className="auth__input-group">
                <input
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
                onClick={(path) => {
                  handleNavigate(path);
                }}
                to={path}
              >
                <h4>{linkText}</h4>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Auth;
