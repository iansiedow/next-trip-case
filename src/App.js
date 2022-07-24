import "./App.css";
import Container from "@mui/material/Container";
import RouteSelect from "./BusLinesForm";
import Header from "./Header";

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <RouteSelect />
    </Container>
  );
}

export default App;
