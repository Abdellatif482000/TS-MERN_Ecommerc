import { useState, useEffect, useRef } from "react";
import { RegistrationForm } from "./registrationForm";

import "bootstrap/dist/css/bootstrap.min.css";

import stylesForm from "./form.module.css";

export function SigninForm() {
  const [formValues, setFromValues] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setFromValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    let checkInputs = Object.values(formValues).every((i) => {
      return i;
    });

    if (checkInputs) {
      getEmail(formValues.email);
    } else {
      alert("Fill this");
      e.preventDefault();
    }
  };

  return (
    <>
      <img src="/city.jpg" />

      <div>
        <form className={stylesForm.formStyle}>
          <input
            type={"text"}
            placeholder="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputs}
          />
          <input
            type={"password"}
            placeholder="Password"
            name="password"
            value={formValues.password}
            onChange={handleInputs}
          />
          <input type="button" value={"Sign in"} onClick={handleSubmit} />

          <button id={"signup"}>Sign up</button>
        </form>
      </div>
    </>
  );
}
