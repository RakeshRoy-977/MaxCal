import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import { ToolsList } from "../ToolsList";
import Profit_and_Loss from "./components/Market/Profit_and_Loss";
import Average_Cost from "./components/Market/Average_Cost";

const MarketData = ToolsList.find((x) => x.name === "Market");

const Market = () => {
  return (
    <div className="flex">
      <div className="w-[300px] sticky top-10 h-full">
        {MarketData.tools.map((x, i) => (
          <SideBar key={i} data={x} />
        ))}
      </div>

      <div className="">
        <div id="1">
          <Profit_and_Loss />
        </div>
        <div className="flex flex-col w-[70vw] m-auto">
          <div className="divider">Next</div>
        </div>
        <div id="2">
          <Average_Cost />
        </div>
        <div className="flex flex-col w-[70vw] m-auto">
          <div className="divider">Next</div>
        </div>
        <div id="3"></div>
      </div>
    </div>
  );
};

export default Market;
