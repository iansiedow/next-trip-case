import "./App.css";
import Container from "@mui/material/Container";
import RouteSelect from "./BusLinesForm";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <RouteSelect />
      </Container>
    </>
  );
}

export default App;
