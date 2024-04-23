import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <AppBar
      color="primary"
      position="static"
      sx={{
        marginBottom: "20px",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Travel Planner App
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            "&:hover": {
              backgroundColor: "blue",
            },
          }}
        >
          {" "}
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/new"
          sx={{
            "&:hover": {
              backgroundColor: "blue",
            },
          }}
        >
          {" "}
          New Trip
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/regions"
          sx={{
            "&:hover": {
              backgroundColor: "blue",
            },
          }}
        >
          {" "}
          Regions
        </Button>
      </Toolbar>
    </AppBar>
  );
}
