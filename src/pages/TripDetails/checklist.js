import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { nanoid } from "nanoid";

export default function Checklist(props) {
  const { checklist = [], onUpdate } = props;
  const [newItem, setNewItem] = useState("");

  const handleAddNewItem = () => {
    const newChecklist = [...checklist];
    newChecklist.push({
      id: nanoid(),
      label: newItem,
      completed: false,
    });
    onUpdate(newChecklist);
    // reset the input field back to empty
    setNewItem("");
  };

  /* second method */
  // const handleItemDelete = (item_id) => {
  //   const updatedChecklist = checklist.filter((i) => i.id !== item_id);
  //   onUpdate(updatedChecklist);
  // };

  return (
    <Box
      sx={{
        paddingTop: "20px",
      }}
    >
      {checklist.length > 0 ? (
        <List>
          {checklist.map((item) => {
            return (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      // do delete item from checklist
                      const updatedChecklist = checklist.filter(
                        (i) => i.id !== item.id
                      );
                      onUpdate(updatedChecklist);
                      /* second method */
                      // handleItemDelete(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  dense
                  onClick={() => {
                    // change the completed according to the checked status
                    const updatedChecklist = checklist.map((i) => {
                      // update the item if the id is matched
                      if (i.id === item.id) {
                        return {
                          ...i,
                          completed: item.completed ? false : true,
                        };
                      }
                      // if id not match, just return its original data
                      return i;
                    });
                    onUpdate(updatedChecklist);
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.completed}
                      disableRipple
                      // onChange={(event, checked) => {
                      //   // change the completed according to the checked status
                      //   const updatedChecklist = checklist.map((i) => {
                      //     // update the item if the id is matched
                      //     if (i.id === item.id) {
                      //       return {
                      //         ...i,
                      //         completed: checked ? true : false,
                      //       };
                      //     }
                      //     // if id not match, just return its original data
                      //     return i;
                      //   });
                      //   onUpdate(updatedChecklist);
                      // }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={
                      item.completed
                        ? {
                            textDecoration: "line-through",
                            opacity: 0.5,
                          }
                        : null
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Typography variant="h6">No item added yet.</Typography>
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
    </Box>
  );
}
//* start like that if its hard to track the brackets

// { checklist.length ? (
//     <>

//     </>
//     ) : (
//     <>

//     </>
//     ) }
