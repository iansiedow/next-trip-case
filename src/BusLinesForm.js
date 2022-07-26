import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import DepartureTable from "./DepartureTable";
import axios from "axios";

export default function BusLinesForm() {
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState("");
  const [directions, setDirections] = useState([]);
  const [direction, setDirection] = useState("");
  const [stops, setStops] = useState([]);
  const [stop, setStop] = useState("");
  const [isRoutesLoaded, setisRoutesLoaded] = useState(false);
  const [isDirectionsLoaded, setIsDirectionsLoaded] = useState(false);
  const [isStopsLoaded, setIsStopsLoaded] = useState(false);

  /* API Data getters */
  useEffect(() => {
    const getRoutes = async () => {
      const response = await axios.get(
        "https://svc.metrotransit.org/nextripv2/routes"
      );
      setisRoutesLoaded(true);
      setRoutes(response.data);
    };

    getRoutes();
  }, []);

  useEffect(() => {
    const getDirections = async () => {
      const response = await axios.get(
        `https://svc.metrotransit.org/NexTrip/Directions/${route.route_id}?format=json`
      );
      setIsDirectionsLoaded(true);
      setDirections(response.data);
    };
    if (route !== "") {
      getDirections();
    }
  }, [route]);

  useEffect(() => {
    const getStops = async () => {
      const response = await axios.get(
        `https://svc.metrotransit.org/NexTrip/Stops/${route.route_id}/${direction.Value}?format=json`
      );
      setIsStopsLoaded(true);
      setStops(response.data);
    };

    if (direction !== "") {
      getStops();
    }
  }, [direction, route]);

  //Event handlers
  const handleRouteChange = (event) => {
    setRoute(event.target.value);
  };
  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  };
  const handleStopChange = (event) => {
    setStop(event.target.value);
  };

  /* Menu item arrays*/
  const routeList = routes.map((route) => (
    <MenuItem value={route}>{route.route_label}</MenuItem>
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
        <Box sx={{ p: 1, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="route-select-label">Select route</InputLabel>
            <Select
              labelId="route-select-label"
              id="route"
              value={route}
              label="Route"
              onChange={handleRouteChange}
            >
              {routeList}
            </Select>
          </FormControl>
        </Box>
      ) : (
        ""
      )}
      {isDirectionsLoaded ? (
        <Box sx={{ p: 1, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="direction-select-label">
              Select direction
            </InputLabel>
            <Select
              labelId="direction-select-label"
              id="direction"
              value={direction}
              label="direction"
              onChange={handleDirectionChange}
            >
              {directionList}
            </Select>
          </FormControl>
        </Box>
      ) : (
        ""
      )}
      {isStopsLoaded ? (
        <Box sx={{ p: 1, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="stop-select-label">Select stop</InputLabel>
            <Select
              labelId="stop-select-label"
              id="stop"
              value={stop}
              label="stop"
              onChange={handleStopChange}
            >
              {stopList}
            </Select>
          </FormControl>
        </Box>
      ) : (
        ""
      )}
      {stop !== "" ? (
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
