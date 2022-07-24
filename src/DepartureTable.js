import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

export default function DepartureTable({ route_id, direction_id, place_code }) {
  const [departures, setDepartures] = useState("");
  const [isDeparturesLoaded, setIsDeparturesLoaded] = useState(false);

  useEffect(() => {
    if (place_code != "") {
      getDeparture();
    }
  }, [place_code]);

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
    console.log(res);
    setIsDeparturesLoaded(true);
    setDepartures(res.departures);
  }
  return (
    <>
      {isDeparturesLoaded ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Route</TableCell>
                <TableCell align="left">Destination</TableCell>
                <TableCell align="right">Departs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departures.map((departure) => (
                <TableRow
                  key={departure.trip_id}
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
