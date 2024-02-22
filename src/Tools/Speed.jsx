import React, { useState, useEffect } from "react";

const Speed = () => {
  const [fromUnit, setFromUnit] = useState("m/s");
  const [toUnit, setToUnit] = useState("km/h");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const unitLabels = {
    "m/s": "Meters per second",
    "km/h": "Kilometers per hour",
    mph: "Miles per hour",
  };

  const conversionFormulas = {
    "m/s": {
      "km/h": (mps) => mps * 3.6,
      mph: (mps) => mps * 2.23694,
    },
    "km/h": {
      "m/s": (kmh) => kmh / 3.6,
      mph: (kmh) => kmh / 1.60934,
    },
    mph: {
      "m/s": (mph) => mph / 2.23694,
      "km/h": (mph) => mph * 1.60934,
    },
  };

  useEffect(() => {
    // Automatically change second unit option if both units are the same
    if (fromUnit === toUnit) {
      const options = Object.keys(conversionFormulas[fromUnit]);
      setToUnit(options.find((option) => option !== fromUnit));
    }
  }, [fromUnit, toUnit, conversionFormulas]);

  const handleConvert = () => {
    if (!value.trim()) {
      setError("Please enter a value.");
      return;
    }

    const convertedValue = conversionFormulas[fromUnit][toUnit](
      parseFloat(value)
    );
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
      <h2 className="text-2xl font-bold mb-4 text-center">Speed Converter</h2>
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
            {Object.keys(conversionFormulas).map((unit) => (
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
            {Object.keys(conversionFormulas[fromUnit]).map((unit) => (
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

export default Speed;
