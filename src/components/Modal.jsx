import React from "react";

function Modal({ children, onCancel }) {
  return (
    <div className="modal-container" style={{ border: "1px solid blue" }}>
      <div className="modal-content">
        <div className="modal">{children}</div>
        <div className="footer">
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
