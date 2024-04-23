import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../components/Header";
import TripCard from "../../components/TripCard/TripCard";
export default function Home() {
  // const trips = [
  //   {
  //     id: "1",
  //     destination: "Bangkok",
  //     start_date: "2024-12-25",
  //     end_date: "2024-12-31",
  //     budget: "RM1000",
  //   },
  //   {
  //     id: "2",
  //     destination: "Singapore",
  //     start_date: "2024-08-25",
  //     end_date: "2024-08-31",
  //     budget: "RM3000",
  //   },
  // ];
  const [region, setRegion] = useState("all");
  let tripsData = JSON.parse(localStorage.getItem("trips"));
  if (!tripsData) {
    tripsData = [];
  }
  const [trips, setTrips] = useState(tripsData);
  const [keyword, setKeyword] = useState("");

  // filter by regions
  let regions = JSON.parse(localStorage.getItem("regions"));
  if (!regions) regions = [];

  // filter by date
  const currentTimestamp = new Date().valueOf();
  const next30DaysTimestamp = currentTimestamp + 30 * 24 * 3600 * 1000;
  // upcoming trips should be within a month
  const upcomingTrips = tripsData.filter((t) => {
    // convert start date to timestamp
    const startDateInTimestamp = new Date(t.start_date).valueOf();
    console.log(startDateInTimestamp);
    // console.log(currentTimestamp);
    // console.log(next30DaysTimestamp);
    // filter the date that is within 30 days
    if (
      startDateInTimestamp > currentTimestamp &&
      startDateInTimestamp < next30DaysTimestamp
    ) {
      return true;
    }

    return false;
  });

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3">Upcoming Trips (in a month)</Typography>
        {upcomingTrips.length > 0 ? (
          <Grid container spacing={2}>
            {upcomingTrips.map((trip) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={trip.id}>
                  <TripCard trip={trip} type="list" />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No upcoming trip yet.</Typography>
            </CardContent>
          </Card>
        )}
        <Typography variant="h3" sx={{ marginTop: "20px" }}>
          All Trips
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={region}
            label="Region"
            sx={{ width: "200px" }}
            onChange={(event) => {
              setRegion(event.target.value);
              // update the trips by filtering the selected region
              const filteredTrips = tripsData.filter((t) => {
                // long
                // if (t.region === event.target.value) return true;
                // else return false;
                // medium
                // return t.region === event.target.value ? true : false;
                // short
                return t.region === event.target.value;
              });
              setTrips(filteredTrips);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            {regions.map((region) => (
              <MenuItem value={region.id}>{region.label}</MenuItem>
            ))}
          </Select>
          <TextField
            label="Search by keywords"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              // filter the trips by keyword
              const filteredTrips = tripsData.filter((t) => {
                // long
                // if (
                //   t.destination
                //     .toLowerCase()
                //     .indexOf(event.target.value.toLowerCase()) > -1
                // ) {
                //   return true;
                // }
                // return false;
                // short
                return (
                  t.destination
                    .toLowerCase()
                    .indexOf(event.target.value.toLowerCase()) > -1
                );
              });
              setTrips(filteredTrips);
            }}
          />
        </Box>
        {trips.length > 0 ? (
          <Grid container spacing={2}>
            {trips
              // .filter((t) => {
              //
              // })
              .map((trip) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={trip.id}>
                    <TripCard trip={trip} type="list" />
                  </Grid>
                );
              })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No trip added yet.</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/new">
                Add New Trip
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
    </>
  );
}
