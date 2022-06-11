import { Button, IconButton, styled, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const BlueButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.customColor.main,
    "&:hover": { backgroundColor: "green" },
  }));

  return (
    <div className="App">
      <Button color="primary" variant="contained">
        MY BUTTON
      </Button>

      <Fab color="primary" aria-label="add" size="small">
        <AddIcon />
      </Fab>
    </div>
  );
}

export default App;
