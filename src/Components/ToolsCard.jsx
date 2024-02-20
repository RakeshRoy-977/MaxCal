import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ToolsCard = ({ data }) => {
  const nav = useNavigate();
  return (
    <Link
      to={`${data.link}`}
      className="group relative block h-64 sm:h-80 lg:h-36"
    >
      <span className="absolute inset-0 border-2 border-dashed border-black"></span>
      <div className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8">
          <p>{data.icon}</p>

          <h2 className="mt-4 text-xl font-medium sm:text-2xl">{data.name}</h2>
        </div>

        <div className="absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8">
          <p>{data.icon}</p>
          <h3 className="mt-4 text-xl font-medium sm:text-2xl">{data.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ToolsCard;
