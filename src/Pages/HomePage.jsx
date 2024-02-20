import React from "react";
import ToolsCard from "../Components/ToolsCard";
import { ToolsList } from "../ToolsList";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[3em] text-center mt-3">
        Maximize Your Conversions with MaxCal!
      </h1>

      <div className="flex flex-wrap gap-5 justify-center m-5 mt-[100px]">
        {ToolsList.map((data) => (
          <ToolsCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
