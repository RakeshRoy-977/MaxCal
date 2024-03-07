import SideBar from "../Components/SideBar";
import { ToolsList } from "../ToolsList";
import Profit_and_Loss from "./components/Market/Profit_and_Loss";
import Average_Cost from "./components/Market/Average_Cost";

const MarketData = ToolsList.find((x) => x.name === "Market");

const Market = () => {
  return (
    <div className="">
      <div id="1">
        <Profit_and_Loss />
      </div>
      <div className="flex flex-col m-auto">
        <div className="divider">Next</div>
      </div>
      <div id="2">
        <Average_Cost />
      </div>
      <div className="flex flex-col m-auto">
        <div className="divider">Next</div>
      </div>
      <div id="3"></div>
    </div>
  );
};

export default Market;
