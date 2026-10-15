import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  closeActiveModal,
  activeModal,
  handleRegisterClick,
  handleLogin,
}) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(formValues);
  }

  return (
    <ModalWithForm
      title="Sign in"
      buttonText="Sign in"
      secondButtonText="or Sign up"
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
      <div className="modal__buttons">
        <button type="submit" className="modal__submit">
          Sign in
        </button>
        <button
          type="button"
          className="modal__btn"
          onClick={handleRegisterClick}
        >
          Or Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}
