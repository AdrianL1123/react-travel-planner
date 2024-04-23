import TripCard from "../../components/TripCard/TripCard";
export default function Details(props) {
  const { trip = {} } = props;
  return (
    <>
      <TripCard trip={trip} type="details" />
    </>
  );
}
