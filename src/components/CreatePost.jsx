import React from "react";
import {
  Avatar,
  Fab,
  FormControl,
  Input,
  InputLabel,
  Modal,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const CreatePost = () => {
  const [open, setOpen] = React.useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <>
      <Tooltip
        onClick={toggleModal}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Modal to create a new post */}
      {open ? (
        <StyledModal
          open={open}
          onClose={toggleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={400}
            height={280}
            bgcolor="white"
            borderRadius={"10px"}
            p={3}
            textAlign="center"
          >
            <Typography variant="h6" color="gray">
              Create a new post
            </Typography>

            {/*userbox of current logged in user */}
            <UserBox>
              <Avatar src="https://i.pravatar.cc/300" />
              <Typography variant="h6">John Doe</Typography>

              {/*form */}
              <FormControl style={{ border: "1px solid gray" }}>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input defaultValue="Hello world" />
              </FormControl>
            </UserBox>
          </Box>
        </StyledModal>
      ) : null}
    </>
  );
};

export default CreatePost;
