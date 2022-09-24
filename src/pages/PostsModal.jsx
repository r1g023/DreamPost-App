import { Button } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function PostsModal({ children, onCancel }) {
  return (
    <div className="modal-containers">
      <div
        className="modal-contents"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="modal">{children}</div>
        <div
          className="footers"
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <CloseIcon
            onClick={onCancel}
            variant="outlined"
            color="error"
            fontSize="small"
            sx={{ padding: "1px", cursor: "pointer" }}
          ></CloseIcon>
        </div>
      </div>
    </div>
  );
}

export default PostsModal;
