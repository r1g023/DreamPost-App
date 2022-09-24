import { Button } from "@mui/material";
import React from "react";

function Modal({ children, onCancel }) {
  return (
    <div
      className="modal-containers"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="modal-contents">
        <div className="modal">{children}</div>
        <div
          className="footers"
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            onClick={onCancel}
            variant="outlined"
            color="error"
            sx={{ padding: "1px" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
