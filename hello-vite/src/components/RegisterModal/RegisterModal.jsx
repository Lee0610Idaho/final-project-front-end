import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  closeActiveModal,
  activeModal,
  handleLoginClick,
  handleRegistration,
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, username } = formValues;
    handleRegistration({ email, password, username });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      secondButtonText="or Sign in"
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Enter password"
          minLength="10"
          value={formValues.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="username"
          name="username"
          placeholder="Enter your username"
          value={formValues.username}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__buttons">
        <button type="submit" className="modal__submit">
          Sign up
        </button>
        <button type="button" className="modal__btn" onClick={handleLoginClick}>
          Or Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}
