import React, { useState, useEffect } from "react";

const Volume = () => {
  const [fromUnit, setFromUnit] = useState("L");
  const [toUnit, setToUnit] = useState("mL");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const unitLabels = {
    L: "Liters",
    mL: "Milliliters",
    m3: "Cubic Meters",
    cm3: "Cubic Centimeters",
  };

  const conversionFactors = {
    L: {
      mL: 1000,
      m3: 0.001,
      cm3: 1000,
    },
    mL: {
      L: 0.001,
      m3: 0.000001,
      cm3: 1,
    },
    m3: {
      L: 1000,
      mL: 1000000,
      cm3: 1000000,
    },
    cm3: {
      L: 0.001,
      mL: 0.001,
      m3: 0.000001,
    },
  };

  useEffect(() => {
    // Automatically change second unit option if both units are the same
    if (fromUnit === toUnit) {
      const options = Object.keys(conversionFactors[fromUnit]);
      setToUnit(options.find((option) => option !== fromUnit));
    }
  }, [fromUnit, toUnit, conversionFactors]);

  const handleConvert = () => {
    if (!value.trim()) {
      setError("Please enter a value.");
      return;
    }

    const convertedValue =
      parseFloat(value) * conversionFactors[fromUnit][toUnit];
    const roundedResult = Math.round(convertedValue * 100) / 100;

    setResult(
      `${value} ${unitLabels[fromUnit]} = ${roundedResult} ${unitLabels[toUnit]}`
    );
    setError("");
  };

  const handleReset = () => {
    setValue("");
    setResult("");
    setError("");
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Volume Converter</h2>
      <div className="flex flex-col items-center mb-4">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full max-w-xs focus:outline-none focus:border-blue-500"
          placeholder="Enter value"
        />
        <div className="flex items-center mb-2">
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
        <div className="flex justify-center">
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
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className="mt-4 text-center">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Volume;
