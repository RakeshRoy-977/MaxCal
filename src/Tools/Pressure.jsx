import React, { useState, useEffect } from "react";

const Pressure = () => {
  const [fromUnit, setFromUnit] = useState("Pa");
  const [toUnit, setToUnit] = useState("bar");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const unitLabels = {
    Pa: "Pascal (Pa)",
    bar: "Bar (bar)",
    atm: "Atmosphere (atm)",
    psi: "PSI (psi)",
  };

  const conversionFormulas = {
    Pa: {
      bar: (Pa) => Pa * 0.00001,
      atm: (Pa) => Pa * 9.8692e-6,
      psi: (Pa) => Pa * 0.000145038,
    },
    bar: {
      Pa: (bar) => bar * 100000,
      atm: (bar) => bar * 0.986923,
      psi: (bar) => bar * 14.5038,
    },
    atm: {
      Pa: (atm) => atm * 101325,
      bar: (atm) => atm * 1.01325,
      psi: (atm) => atm * 14.6959,
    },
    psi: {
      Pa: (psi) => psi * 6894.76,
      bar: (psi) => psi * 0.0689476,
      atm: (psi) => psi * 0.068046,
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
        Pressure Converter
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

export default Pressure;
