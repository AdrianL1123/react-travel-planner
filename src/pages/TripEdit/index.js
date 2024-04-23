import Header from "../../components/Header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function TripEdit() {
  const navigate = useNavigate();
  // INSTRUCTION: Get the id from the params
  const { id } = useParams();
  // INSTRUCTION: load the trips data from local storage
  const trips = JSON.parse(localStorage.getItem("trips"));
  // INSTRUCTION: based on the id params, find the selected trip data
  const trip = trips.find((t) => t.id === id);
  // INSTRUCTION: declare all the states for input fields, and assign the value from the selected trip data as default in the useState
  const [destination, setDestination] = useState(trip ? trip.destination : "");
  const [startDate, setStartDate] = useState(trip ? trip.start_date : "");
  const [endDate, setEndDate] = useState(trip ? trip.end_date : "");
  const [budget, setBudget] = useState(trip ? trip.budget : "");
  // INSTRUCTION: handle form submit to update the trip
  const handleFormSubmit = () => {
    // 1. validate the input fields
    let error = "";
    // INSTRUCTION: make sure all fields are filled
    if (
      destination === "" ||
      startDate === "" ||
      endDate === "" ||
      budget === ""
    ) {
      error = "Please fill up all the details";
    }

    // INSTRUCTION: make sure end date wasn't before the start date
    if (startDate > endDate) {
      error = "End Date must be after the start date";
    }
    // INSTRUCTION: if error is not empty, trigger the error alert
    if (error !== "") {
      alert(error);
    } else {
      // if error is empty, meaning that everything is good to go
      // INSTRUCTION: update the trip data with the latest state
      const updatedTrips = trips.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            destination,
            start_date: startDate,
            end_date: endDate,
            budget,
          };
        }
        return t;
      });
      // INSTRUCTION: store the updated trip array into local storage
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      // INSTRUCTION: redirect back to home page
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      {/* INSTRUCTION: put the form for edit trip  */}
      <Container maxWidth="sm">
        <Typography variant="h3">Update Trip</Typography>
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
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="date"
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  label="Budget"
                  variant="outlined"
                  fullWidth
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Button variant="contained" fullWidth onClick={handleFormSubmit}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
