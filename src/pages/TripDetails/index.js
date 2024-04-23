import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Details from "./details";
import Checklist from "./checklist";
import { Container } from "@mui/material";

export default function TripDetails() {
  // const navigate = useNavigate();
  // will load the data from local storage
  // const trip = {
  //   id: "1",
  //   destination: "Bangkok",
  //   start_date: "2024-12-25",
  //   end_date: "2024-12-31",
  //   budget: "RM1000",
  //   checklist: [
  //     { id: "1", label: "Eat Mango sticky rice", completed: true },
  //     { id: "2", label: "Visit Zoo", completed: false },
  //     { id: "3", label: "Go night market", completed: false },
  //   ],
  // };
  // INSTRUCTION: 1. get the id params from the url
  const { id } = useParams();
  // INSTRUCTION: 2. load the trips data from local storage
  const trips = JSON.parse(localStorage.getItem("trips"));

  // INSTRUCTION: 3. based on the id params, find the selected trip data
  const trip = trips.find((t) => t.id === id); // returns array?
  const [checklist, setChecklist] = useState(trip ? trip.checklist : []);
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        {/* INSTRUCTION: 4. if trip is not found, display "not found" message */}
        <Details trip={trip} />
        <Checklist
          checklist={checklist}
          onUpdate={(newChecklist) => {
            setChecklist(newChecklist);
            // update trips into the local storage
            const updatedTrips = trips.map((t) => {
              if (t.id === id) {
                return {
                  ...t,
                  checklist: newChecklist,
                };
              }
              return t;
            });
            // store the updated trip array into local storage
            localStorage.setItem("trips", JSON.stringify(updatedTrips));
          }}
        />
      </Container>
    </>
  );
}
