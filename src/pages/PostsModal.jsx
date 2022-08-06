import { Button } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function PostsModal({ children, onCancel }) {
  return (
    <div className="modal-container">
      <div
        className="modal-content"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="modal">{children}</div>
        <div
          className="footer"
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <CloseIcon
            onClick={onCancel}
            variant="outlined"
            color="error"
            size="small"
            sx={{ padding: "1px", cursor: "pointer" }}
          ></CloseIcon>
        </div>
      </div>
    </div>
  );
}

export default PostsModal;
