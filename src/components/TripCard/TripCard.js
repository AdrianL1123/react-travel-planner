import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function TripCard(props) {
  const { trip, type = "list" } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{trip.destination}</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary={trip.start_date + " - " + trip.end_date} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary={trip.budget} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          {/* conditional rendering */}
          {type === "list" ? (
            <Button component={Link} to={`/trip/${trip.id}`}>
              View Details
            </Button>
          ) : (
            <Button component={Link} to={`/trip/${trip.id}/edit`}>
              Edit Details
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
