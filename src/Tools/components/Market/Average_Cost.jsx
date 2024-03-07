import React, { useState } from "react";
import { inputClassNames, labelClassNames } from "../style";

const Average_Cost = () => {
  const [Data, setData] = useState({
    First_Qty: 0,
    First_Price: 0,
    Second_Qty: 0,
    Second_Price: 0,
  });
  const [Info, setInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Data);
    setInfo(true);
  };
  const handelReset = () => {
    setInfo(false);
    setData({ First_Qty: 0, First_Price: 0, Second_Qty: 0, Second_Price: 0 });
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  return (
    <div className=" flex flex-col justify-center h-[80vh]  m-5 p-2">
      <h1 className="text-center text-3xl mb-5">Average Cost</h1>

      <div className=" flex items-start justify-center  gap-10 m-2 p-2">
        {Info && (
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-6">
            <div className="stat">
              <div className="stat-title">Total investment</div>
              <div className="stat-value">
                {+Data.First_Qty * +Data.First_Price +
                  +Data.Second_Qty * +Data.Second_Price}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Avg Price</div>
              <div className="stat-value">
                {(+Data.First_Price + +Data.Second_Price) / 2}
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center gap-3"
        >
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <input
              type="number"
              onChange={handelChange}
              name="First_Qty"
              value={Data.First_Qty === 0 ? "" : Data.First_Qty}
              className={inputClassNames}
              placeholder=" "
              required
            />
            <label className={labelClassNames}>First Qty</label>
          </div>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <input
              type="number"
              onChange={handelChange}
              name="First_Price"
              value={Data.First_Price === 0 ? "" : Data.First_Price}
              className={inputClassNames}
              placeholder=" "
              required
            />
            <label className={labelClassNames}>First Price</label>
          </div>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <input
              type="number"
              onChange={handelChange}
              name="Second_Qty"
              value={Data.Second_Qty === 0 ? "" : Data.Second_Qty}
              className={inputClassNames}
              placeholder=" "
              required
            />
            <label className={labelClassNames}>Second Qty</label>
          </div>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
            <input
              type="number"
              onChange={handelChange}
              name="Second_Price"
              value={Data.Second_Price === 0 ? "" : Data.Second_Price}
              className={inputClassNames}
              placeholder=" "
              required
            />
            <label className={labelClassNames}>Second Price</label>
          </div>

          <div className="flex gap-5 items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>

            {Info && (
              <button className="btn btn-square" onClick={handelReset}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Average_Cost;
