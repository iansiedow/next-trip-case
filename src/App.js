import "./App.css";
import Container from "@mui/material/Container";
import BusLinesForm from "./BusLinesForm";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <BusLinesForm />
      </Container>
    </>
  );
}

export default App;
