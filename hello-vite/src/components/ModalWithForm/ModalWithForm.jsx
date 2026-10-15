import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  title,
  closeActiveModal,
  activeModal,
  onSubmit,
}) {
  return (
    <div
      className={`modal ${activeModal ? "modal_opened" : ""}`}
      onClick={closeActiveModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        ></button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
