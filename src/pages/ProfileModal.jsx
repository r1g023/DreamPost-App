import { Button } from "@mui/material";
import React from "react";

function ProfileModal({ children, onCancel }) {
  return (
    <div className="modal-container">
      <div className="modal-content" style={{ borderRadius: "20px" }}>
        <div className="modal">{children}</div>
        <div className="footer">
          <Button onClick={onCancel} variant="outlined" color="error">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
