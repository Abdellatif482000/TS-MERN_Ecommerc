import { useState, useEffect, useRef } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";

import { addData, InintDB } from "./storeData";

import { Tooltip } from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import stylesForm from "./form.module.css";

export function RegistrationForm() {
  const [formValues, setFromValues] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const [inputValidity, setInputValidity] = useState(false);
  const [formValidity, setFormValidity] = useState({
    username: false,
    email: false,
    password: false,
    age: false,
  });

  const handleInput = (e) => {
    // e.preventDefault();
    setFromValues((perv) => ({ ...perv, [e.target.name]: e.target.value }));

    const inputRGX = new RegExp(e.target.dataset.rgx);
    const inputValidMSG = e.target.nextSibling;

    if (e.target.value.match(inputRGX)) {
      setInputValidity(true);
      setFormValidity({
        ...formValidity,
        [e.target.name]: true,
      });
      inputValidMSG.classList.remove("fa-warning", true);
      inputValidMSG.classList.add("fa-check", true);
      inputValidMSG.setAttribute("data-tooltip-content", "valid");
    } else {
      setInputValidity(false);
      setFormValidity({
        ...formValidity,
        [e.target.name]: false,
      });
      inputValidMSG.classList.remove("fa-check", true);
      inputValidMSG.classList.add("fa-warning", true);
      inputValidMSG.setAttribute(
        "data-tooltip-content",
        e.target.dataset.validityriquires
      );
    }
  };

  const handleSubmit = (e) => {
    let checkFormValidity = Object.values(formValidity).every((i) => {
      return i;
    });
    console.log(checkFormValidity);
    if (checkFormValidity === true) {
      addData(formValues);
    } else if (checkFormValidity === false) {
      alert("Not Valid Values");
      e.preventDefault();
    }
  };
  return (
    <>
      <InintDB />
      <form id="form" className={stylesForm.formStyle} onSubmit={handleSubmit}>
        <h3>Registration Form</h3>

        <label className={stylesForm.label}>
          <input
            className={`${stylesForm.input} filed`}
            id={"name"}
            placeholder="Name"
            name="username"
            value={formValues.username}
            data-rgx="^[a-zA-Z]+$"
            data-valid={inputValidity}
            data-validityriquires="Can not be empty and can not include numbers"
            onChange={handleInput}
          />

          <i
            className={"fa fa-warning icon"}
            id={"validityMSG"}
            data-tooltip-id="my-tooltip"
          >
            <Tooltip id="my-tooltip" />
          </i>
        </label>

        <label className={stylesForm.label}>
          <input
            className={`${stylesForm.input} filed`}
            type={"E-mail"}
            id={"field email"}
            placeholder="Email"
            value={formValues.email}
            name="email"
            data-rgx="^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            data-valid={inputValidity}
            data-validityriquires="Should be include @ and .com"
            onChange={handleInput}
          />
          <i
            className={"fa fa-warning icon"}
            id={"validityMSG"}
            data-tooltip-id="my-tooltip"
          >
            <Tooltip id="my-tooltip" />
          </i>
        </label>

        <label className={stylesForm.label}>
          <input
            className={`${stylesForm.input} filed`}
            type={"Password"}
            id={"field password"}
            placeholder="Password"
            value={formValues.password}
            name="password"
            data-rgx="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            data-valid={inputValidity}
            data-validityriquires="Should be include 1 uppercase, 1 lowercase, 1 number and 1 special character"
            onChange={handleInput}
          />
          <i
            className={"fa fa-warning icon"}
            id={"validityMSG"}
            data-tooltip-id="my-tooltip"
          >
            <Tooltip id="my-tooltip" />
          </i>
        </label>

        <label className={stylesForm.label}>
          <input
            className={`${stylesForm.input} filed`}
            type={"number"}
            id={"field age"}
            placeholder="age"
            value={formValues.age}
            name="age"
            data-rgx="^(?:1[8-9]|[2-5][0-9]|60)$"
            data-valid={inputValidity}
            data-validityriquires="Should be +15"
            onChange={handleInput}
          />
          <i
            className={"fa fa-warning icon"}
            id={"validityMSG"}
            data-tooltip-id="my-tooltip"
          >
            <Tooltip id="my-tooltip" />
          </i>
        </label>
        <input
          className={stylesForm.submitBtn}
          type={"submit"}
          value="Submit"
          id={"subBtn"}
          // disabled={submitState}
        />
      </form>
    </>
  );
}
