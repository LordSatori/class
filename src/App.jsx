//React Tools
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Sidebar from "./components/Sidebar";

//Pages
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import Score from "./Pages/Score";

function App() {
  return (
    <Router>
      <main style={{height : 2500}} className="d-flex bg-body-tertiary">
        <div className="w-25 bg-dark">
          <Sidebar />
        </div>
        <div className="w-75">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App;