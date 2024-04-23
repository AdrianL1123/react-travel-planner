import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Header from "../../components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export default function TripAddNew() {
  // long method to get today's date
  // const date = new Date();
  // const today = date.toISOString();
  // const todayArray = today.split("T");
  // const todayDate = todayArray[0];
  // short method to get today's date
  let regions = JSON.parse(localStorage.getItem("regions"));
  if (!regions) regions = [];
  const todayDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [budget, setBudget] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState("");

  const handleFormSubmit = () => {
    // 1. validate the input fields
    let error = "";
    // make sure all fields are filled
    if (
      destination === "" ||
      startDate === "" ||
      endDate === "" ||
      budget === ""
    ) {
      error = "Please fill up all the details";
    }

    if (startDate > endDate) {
      error = "Your end date must be after the start date";
    }

    // if error is not empty, trigger the error alert
    if (error !== "") {
      alert(error);
    } else {
      // if error is empty, meaning that everything is good to go
      // 2. create a new trip object
      const newTrip = {
        id: nanoid(),
        destination,
        start_date: startDate,
        end_date: endDate,
        budget,
        region: region,
        image: image,
        checklist: [],
      };
      // 3. get the latest trips data from local storage
      let latestTrips = JSON.parse(localStorage.getItem("trips"));
      // 3.1 make sure latestTrips exists. If not, _____
      if (!latestTrips) {
        latestTrips = [];
      }

      // 4. push the new trip into trips array
      latestTrips.push(newTrip);
      // 5. store the updated trips array into local storage
      localStorage.setItem("trips", JSON.stringify(latestTrips));
      // 6. redirect back to home page
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h3">Add New Trip</Typography>
        <Card
          sx={{
            border: "2px solid #000",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Destination"
                  variant="outlined"
                  fullWidth
                  value={destination}
                  onChange={(event) => {
                    setDestination(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Budget"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">RM</InputAdornment>
                    ),
                  }}
                  fullWidth
                  value={budget}
                  onChange={(event) => {
                    setBudget(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  onChange={(event) => {
                    const selectedFile = event.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    reader.onload = () => {
                      setImage(reader.result);
                    };
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Region
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={region}
                    label="Region"
                    onChange={(event) => {
                      setRegion(event.target.value);
                    }}
                  >
                    {regions.map((region) => (
                      <MenuItem value={region.id}>{region.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleFormSubmit}
            >
              Add New
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
