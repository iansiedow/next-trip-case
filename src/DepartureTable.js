import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

export default function DepartureTable({ route_id, direction_id, place_code }) {
  const [departures, setDepartures] = useState([]);
  const [isDeparturesLoaded, setIsDeparturesLoaded] = useState(false);

  useEffect(() => {
    async function getDeparture() {
      const response = await fetch(
        `https://svc.metrotransit.org/nextripv2/${route_id}/${direction_id}/${place_code}?format=json`
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.log(response);
        throw new Error(message);
      }
      const res = await response.json();
      setIsDeparturesLoaded(true);
      setDepartures(res);
    }
    if (place_code !== "") {
      getDeparture();
    }
  }, [place_code, direction_id, route_id]);

  return (
    <>
      {isDeparturesLoaded ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {departures.stops[0].description}
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.primary",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Stop # {departures.stops[0].stop_id}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 16,
                    fontWeight: 400,
                    bgcolor: "#ffd200",
                  }}
                >
                  ROUTE
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 16,
                    fontWeight: 400,
                    bgcolor: "#ffd200",
                  }}
                  align="left"
                >
                  DESTINATION
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    fontSize: 16,
                    fontWeight: 400,
                    bgcolor: "#ffd200",
                  }}
                  align="right"
                >
                  DEPARTS
                </TableCell>
              </TableRow>
              {departures.departures.map((departure) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {departure.route_id}
                  </TableCell>
                  <TableCell align="left">{departure.description}</TableCell>
                  <TableCell align="right">
                    {departure.departure_text}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
}
