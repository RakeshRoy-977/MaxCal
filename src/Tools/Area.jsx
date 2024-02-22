import React, { useState, useEffect } from "react";

const Area = () => {
  const [fromUnit, setFromUnit] = useState("km2");
  const [toUnit, setToUnit] = useState("m2");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const unitLabels = {
    km2: "Square Kilometers",
    m2: "Square Meters",
    cm2: "Square Centimeters",
    mm2: "Square Millimeters",
    ha: "Hectares",
    acre: "Acres",
  };

  const conversionFactors = {
    km2: {
      m2: 1e6,
      cm2: 1e10,
      mm2: 1e12,
      ha: 100,
      acre: 247.105,
    },
    m2: {
      km2: 1e-6,
      cm2: 1e4,
      mm2: 1e6,
      ha: 1e-4,
      acre: 0.000247105,
    },
    cm2: {
      km2: 1e-10,
      m2: 1e-4,
      mm2: 100,
      ha: 1e-8,
      acre: 2.47105e-8,
    },
    mm2: {
      km2: 1e-12,
      m2: 1e-6,
      cm2: 0.01,
      ha: 1e-10,
      acre: 2.47105e-10,
    },
    ha: {
      km2: 0.01,
      m2: 1e4,
      cm2: 1e8,
      mm2: 1e10,
      acre: 2.47105,
    },
    acre: {
      km2: 0.00404686,
      m2: 4046.86,
      cm2: 404686000,
      mm2: 4046856000,
      ha: 0.404686,
    },
  };

  useEffect(() => {
    if (fromUnit === toUnit) {
      const options = Object.keys(conversionFactors[fromUnit]).filter(
        (unit) => unit !== fromUnit
      );
      setToUnit(options[0]);
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
      <h2 className="text-2xl font-bold mb-4 text-center">Area Converter</h2>
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

export default Area;
