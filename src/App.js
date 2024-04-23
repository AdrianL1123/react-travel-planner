import "./styles.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TripDetails from "./pages/TripDetails";
import TripAddNew from "./pages/TripAddNew";
import TripEdit from "./pages/TripEdit";
import Regions from "./pages/Regions";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/trip/:id/edit" element={<TripEdit />} />
        <Route path="/new" element={<TripAddNew />} />
        <Route path="/regions" element={<Regions />} />
      </Routes>
    </BrowserRouter>
  );
}
