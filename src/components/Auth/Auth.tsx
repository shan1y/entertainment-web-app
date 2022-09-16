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
  } = props;
  return (
    <section className="auth">
      <div className="auth__card">
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            handleSubmit(e);
          }}
          className="auth__form"
        >
          <h2 className="auth__title">{title}</h2>
          <input
            name="email"
            placeholder="email"
            className="auth__input"
          ></input>
          <input
            name="password"
            placeholder="password"
            className="auth__input"
          ></input>
          {extraInput ? (
            <input
              placeholder="confirm password"
              name="passwordReset"
              className="auth__input"
            ></input>
          ) : null}

          <button type="submit" className="auth__submit">
            {accSubmit}
          </button>
          <div className="">
            <h4>{accQuestion}</h4>
            <Link to={path}>{linkText}</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Auth;
