import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import { nanoid } from "nanoid";

import Header from "../../components/Header";

export default function RegionsPage() {
  //   const regions = [
  //     { id: "1", label: "US" },
  //     { id: "2", label: "South East Asia" },
  //     { id: "3", label: "EU" },
  //     { id: "4", label: "East Asia" },
  //     { id: "5", label: "South Asia" },
  //   ];
  // load the data from the local storage
  let regions = JSON.parse(localStorage.getItem("regions"));
  if (!regions) regions = [];
  const [newItem, setNewItem] = useState("");

  const handleAddNewItem = () => {
    const newRegions = [...regions];
    newRegions.push({
      id: nanoid(),
      label: newItem,
    });
    localStorage.setItem("regions", JSON.stringify(newRegions));
    // reset the text field
    setNewItem("");
  };
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        {regions.length > 0 ? (
          <List dense>
            {regions.map((region) => (
              <ListItem
                key={region.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={region.label} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h6">No region added yet.</Typography>
        )}
        <Box display="flex" gap={"5px"} sx={{ paddingTop: "20px" }}>
          <TextField
            label="Add new Item"
            fullWidth
            value={newItem}
            onChange={(event) => {
              setNewItem(event.target.value);
            }}
          />
          <Button
            variant="contained"
            sx={{
              paddingLeft: "45px",
              paddingRight: "45px",
            }}
            onClick={handleAddNewItem}
          >
            <AddIcon />
          </Button>
        </Box>
      </Container>
    </div>
  );
}
