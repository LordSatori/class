//React Tools
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Sidebar from "./components/Sidebaridebar";

//Pages
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import Score from "./Pages/Score";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App;