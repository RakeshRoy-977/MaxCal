import React from "react";
import { useLocation } from "react-router-dom";

const Categorie = () => {
  const location = useLocation();
  const myObject = location.state;
  console.log(myObject);
  return <div>Categorie</div>;
};

export default Categorie;
