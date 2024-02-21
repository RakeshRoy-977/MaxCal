import React, { useState } from "react";

const Profit_and_Loss = () => {
  const [Data, setData] = useState({ buying: 0, selling: 0, qty: 0 });
  const [Info, setInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Data);
    setInfo(true);
  };
  const handelReset = () => {
    setInfo(false);
    setData({ buying: 0, selling: 0, qty: 0 });
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  return (
    <div className=" flex flex-col justify-center h-[80vh]  m-5 p-2">
      <h1 className="text-center text-3xl mb-5">Profit & Loss Calculator</h1>

      <div className=" flex items-start justify-center w-[80vw] gap-10 m-2 p-2">
        {Info && (
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-6">
            <div className="stat">
              <div className="stat-title">Buy Price</div>
              <div className="stat-value">{Data.buying}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Sell Price</div>
              <div className="stat-value">{Data.selling}</div>
            </div>

            <div className="stat">
              <div className="stat-title">Total investment</div>
              <div className="stat-value">{Data.buying * Data.qty}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Result</div>
              <div
                className={
                  Data.selling * Data.qty - Data.buying * Data.qty < 0
                    ? "stat-value text-red-400"
                    : "stat-value text-green-400"
                }
              >
                {Data.selling * Data.qty - Data.buying * Data.qty}
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center gap-3"
        >
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 mr-2"
            type="number"
            name="buying"
            value={Info ? Data.buying : ""}
            placeholder="Enter buying Price"
            onChange={handelChange}
          />
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 mr-2"
            type="number"
            name="selling"
            value={Info ? Data.selling : ""}
            placeholder="Enter selling Price"
            onChange={handelChange}
          />
          <input
            className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 mr-2"
            type="number"
            name="qty"
            placeholder="Enter Qty"
            value={Info ? Data.qty : ""}
            onChange={handelChange}
          />
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

export default Profit_and_Loss;
