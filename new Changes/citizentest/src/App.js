// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useContext } from "react";
import "./styles/App.css";
import React from "react";
import Home from "./Pages/Home.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/footer.jsx";
import News from "./Pages/News.jsx";

function App() {
  return (
    <div>
      <News />
    </div>
  );
}

export default App;
