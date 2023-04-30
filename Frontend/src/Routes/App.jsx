import { ThemeProvider, createTheme } from "@mui/material";
import Home from "../Pages/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    // <ThemeProvider>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    // </ThemeProvider>
  );
}

export default App;
