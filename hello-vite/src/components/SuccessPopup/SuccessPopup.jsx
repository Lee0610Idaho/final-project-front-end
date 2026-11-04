import React from "react";
import "./SuccessPopup.css";
import Close from "../../assets/close.svg";

export default function SuccessPopup({ onClose, handleLoginClick }) {
  const handleSuccessSignInClick = () => {
    onClose();
    handleLoginClick();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup__close" type="button" onClick={onClose}>
          <img src={Close} alt="close button" />
        </button>
        <p className="popup__message">Registration successfully completed!</p>
        <button className="popup__sign-in" onClick={handleSuccessSignInClick}>
          Sign in
        </button>
      </div>
    </div>
  );
}
