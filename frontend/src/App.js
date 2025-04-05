import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import JobSearch from "./pages/JobSearch";


function HeroPage() {
  return (
    <div className="App">
      <Hero></Hero>
    </div>
  );
}



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/jobs" element={<JobSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
