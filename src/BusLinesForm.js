import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import DepartureTable from "./DepartureTable";

export default function RouteSelect() {
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState("");
  const [directions, setDirections] = useState([]);
  const [direction, setDirection] = useState("");
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState("");
  const [isRoutesLoaded, setisRoutesLoaded] = useState(false);
  const [isDirectionsLoaded, setIsDirectionsLoaded] = useState(false);
  const [isStopsLoaded, setIsStopsLoaded] = useState(false);

  useEffect(() => {
    getRoutes();
  }, []);
  useEffect(() => {
    if (route != "") {
      getDirections();
    }
  }, [route]);
  useEffect(() => {
    if (direction != "") {
      getStops();
    }
  }, [direction]);

  const handleRouteChange = (event) => {
    setRoute(event.target.value);
  };
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };
  const handleStopChange = (event) => {
    setStop(event.target.value);
  };
  async function getRoutes() {
    const response = await fetch(
      "https://svc.metrotransit.org/nextripv2/routes"
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const routes = await response.json();
    console.log(routes);
    setisRoutesLoaded(true);
    setRoutes(routes);
  }
  async function getDirections() {
    console.log("directions");
    const response = await fetch(
      `https://svc.metrotransit.org/NexTrip/Directions/${route.route_id}?format=json`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const directions = await response.json();
    console.log(directions);
    setIsDirectionsLoaded(true);
    setDirections(directions);
  }
  async function getStops() {
    const response = await fetch(
      `https://svc.metrotransit.org/NexTrip/Stops/${route.route_id}/${direction.Value}?format=json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.log(response);
      throw new Error(message);
    }
    const stops = await response.json();
    console.log(stops);
    setIsStopsLoaded(true);
    setStops(stops);
  }

  const routeList = routes.map((route) => (
    <MenuItem key={route.route_id} value={route}>
      {route.route_label}
    </MenuItem>
  ));

  const directionList = directions.map((direction) => (
    <MenuItem value={direction}>{direction.Text}</MenuItem>
  ));

  const stopList = stops.map((stop) => (
    <MenuItem value={stop}>{stop.Text}</MenuItem>
  ));
  return (
    <>
      {isRoutesLoaded ? (
        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="route-label">Select Route</InputLabel>
          <Select
            labelId="route-select-label"
            id="route"
            name="route"
            value={route}
            label="route"
            onChange={handleRouteChange}
          >
            {routeList}
          </Select>
        </Box>
      ) : (
        "Loading..."
      )}
      {isDirectionsLoaded ? (
        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="direction-label">Select Direction</InputLabel>
          <Select
            labelId="direction-select-label"
            id="direction"
            name="direction"
            value={direction}
            label="direction"
            onChange={handleDirectionChange}
          >
            {directionList}
          </Select>
        </Box>
      ) : (
        ""
      )}
      {isStopsLoaded ? (
        <Box sx={{ minWidth: 120 }}>
          <InputLabel id="stop-label">Select Stop</InputLabel>
          <Select
            labelId="stop-select-label"
            id="stop"
            name="stop"
            value={stop}
            label="stop"
            onChange={handleStopChange}
          >
            {stopList}
          </Select>
        </Box>
      ) : (
        ""
      )}
      {stop != "" ? (
        <DepartureTable
          route_id={route.route_id}
          direction_id={direction.Value}
          place_code={stop.Value}
        />
      ) : (
        ""
      )}
    </>
  );
}
