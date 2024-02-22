import React, { useState } from "react";

const Length = () => {
  const [fromUnit, setFromUnit] = useState("km");
  const [toUnit, setToUnit] = useState("m");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const unitLabels = {
    km: "Kilometers",
    m: "Meters",
    cm: "Centimeters",
    mm: "Millimeters",
    mi: "Miles",
    yd: "Yards",
    ft: "Feet",
    in: "Inches",
  };

  const conversionFactors = {
    km: {
      m: 1000,
      cm: 100000,
      mm: 1000000,
      mi: 1609.34,
      yd: 914.4,
      ft: 304.8,
      in: 25.4,
    },
    m: {
      km: 0.001,
      cm: 100,
      mm: 1000,
      mi: 0.000621371,
      yd: 1.09361,
      ft: 3.28084,
      in: 39.3701,
    },
    cm: {
      km: 0.00001,
      m: 0.01,
      mm: 10,
      mi: 0.00000621371,
      yd: 0.0109361,
      ft: 0.0328084,
      in: 0.393701,
    },
    mm: {
      km: 0.000001,
      m: 0.001,
      cm: 0.1,
      mi: 0.000000621371,
      yd: 0.00109361,
      ft: 0.00328084,
      in: 0.0393701,
    },
    mi: {
      km: 1.60934,
      m: 1609.34,
      cm: 160934,
      mm: 1609340,
      yd: 1760,
      ft: 5280,
      in: 63360,
    },
    yd: {
      km: 0.0009144,
      m: 0.9144,
      cm: 91.44,
      mm: 914.4,
      mi: 0.000568182,
      ft: 3,
      in: 36,
    },
    ft: {
      km: 0.0003048,
      m: 0.3048,
      cm: 30.48,
      mm: 304.8,
      mi: 0.000189394,
      yd: 0.333333,
      in: 12,
    },
    in: {
      km: 0.0000254,
      m: 0.0254,
      cm: 2.54,
      mm: 25.4,
      mi: 0.0000157828,
      yd: 0.0277778,
      ft: 0.0833333,
    },
  };

  const handleConvert = () => {
    if (!value.trim()) {
      setError("Please enter a value.");
      return;
    }

    const convertedValue =
      parseFloat(value) * conversionFactors[fromUnit][toUnit];
    const roundedResult = Math.round(convertedValue * 100) / 100;

    if (roundedResult % 1 === 0) {
      setResult(
        `${value} ${unitLabels[fromUnit]} = ${roundedResult} ${unitLabels[toUnit]}`
      );
    } else {
      setResult(
        `${value} ${unitLabels[fromUnit]} = ${roundedResult.toFixed(2)} ${
          unitLabels[toUnit]
        }`
      );
    }
    setError("");
  };

  const handleReset = () => {
    setValue("");
    setResult("");
    setError("");
  };

  return (
    <div className="mx-auto w-80 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Length Converter</h2>
      <div className="flex items-center mb-4 justify-center">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-32 focus:outline-none focus:border-blue-500"
          placeholder="Enter value"
        />
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none"
        >
          {Object.keys(conversionFactors).map((unit) => (
            <option key={unit} value={unit}>
              {unit} ({unitLabels[unit]})
            </option>
          ))}
        </select>
        <span className="text-gray-600">to</span>
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 ml-2 focus:outline-none"
        >
          {Object.keys(conversionFactors[fromUnit]).map((unit) => (
            <option key={unit} value={unit}>
              {unit} ({unitLabels[unit]})
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleConvert}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
        >
          Convert
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reset
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className="mt-4 text-center">
          <p className="text-gray-800">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Length;
