import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import Length from "./Tools/Length";
import Area from "./Tools/Area";
import Volume from "./Tools/Volume";
import MassWeight from "./Tools/MassWeight";
import Temperature from "./Tools/Temperature";
import Speed from "./Tools/Speed";
import Time from "./Tools/Time";
import Currency from "./Tools/Currency";
import Energy from "./Tools/Energy";
import Power from "./Tools/Power";
import Pressure from "./Tools/Pressure";
import FuelEfficiency from "./Tools/FuelEfficiency";
import Market from "./Tools/Market";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/length" element={<Length />} />
        <Route path="/area" element={<Area />} />
        <Route path="/volume" element={<Volume />} />
        <Route path="/massweight" element={<MassWeight />} />
        <Route path="/temperature" element={<Temperature />} />
        <Route path="/speed" element={<Speed />} />
        <Route path="/time" element={<Time />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/power" element={<Power />} />
        <Route path="/pressure" element={<Pressure />} />
        <Route path="/fuelefficiency" element={<FuelEfficiency />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </>
  );
};

export default App;
