import React from "react";

const SideBar = ({ data }) => {
  return (
    <li className="list-none ">
      <a href={data.link} className="block  rounded-lg  px-4 py-2 font-medium ">
        {data.name}
      </a>
    </li>
  );
};

export default SideBar;
