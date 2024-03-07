import React, { useState, useEffect } from "react";

const MassWeight = () => {
  const [fromUnit, setFromUnit] = useState("g");
  const [toUnit, setToUnit] = useState("kg");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const unitLabels = {
    g: "Gram (g)",
    kg: "Kilogram (kg)",
    mg: "Milligram (mg)",
    lb: "Pound (lb)",
    oz: "Ounce (oz)",
  };

  const conversionFormulas = {
    g: {
      kg: (g) => g / 1000,
      mg: (g) => g * 1000,
      lb: (g) => g * 0.00220462,
      oz: (g) => g * 0.035274,
    },
    kg: {
      g: (kg) => kg * 1000,
      mg: (kg) => kg * 1e6,
      lb: (kg) => kg * 2.20462,
      oz: (kg) => kg * 35.274,
    },
    mg: {
      g: (mg) => mg / 1000,
      kg: (mg) => mg / 1e6,
    },
    lb: {
      g: (lb) => lb / 0.00220462,
      kg: (lb) => lb / 2.20462,
      oz: (lb) => lb * 16,
    },
    oz: {
      g: (oz) => oz / 0.035274,
      kg: (oz) => oz / 35.274,
      lb: (oz) => oz / 16,
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
    setShowButtons(true);
  };

  const handleReset = () => {
    setValue("");
    setResult("");
    setError("");
    setShowButtons(false);
  };

  const handleFlip = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Mass/Weight Converter
      </h2>
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
                {unitLabels[unit]}
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
                {unitLabels[unit]}
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
          {showButtons && (
            <>
              <button
                onClick={handleReset}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
              >
                Reset
              </button>
              <button
                onClick={handleFlip}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Flip
              </button>
            </>
          )}
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

export default MassWeight;
