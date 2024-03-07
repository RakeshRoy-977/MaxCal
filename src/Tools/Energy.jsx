import React, { useState, useEffect } from "react";

const Energy = () => {
  const [fromUnit, setFromUnit] = useState("J");
  const [toUnit, setToUnit] = useState("cal");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const unitLabels = {
    J: "Joule (J)",
    cal: "Calorie (cal)",
    kWh: "Kilowatt-hour (kWh)",
    BTU: "British Thermal Unit (BTU)",
    eV: "Electronvolt (eV)",
    Wh: "Watt-hour (Wh)",
    ft_lb: "Foot-pound (ft-lb)",
  };

  const conversionFormulas = {
    J: {
      cal: (J) => J * 0.239,
      kWh: (J) => J * 2.778e-7,
      BTU: (J) => J * 9.478e-4,
      eV: (J) => J * 6.242e18,
      Wh: (J) => J * 2.778e-4,
      ft_lb: (J) => J * 0.7376,
    },
    cal: {
      J: (cal) => cal / 0.239,
      kWh: (cal) => cal * 1.163e-6,
      BTU: (cal) => cal * 0.003968,
      eV: (cal) => cal * 2.613e19,
      Wh: (cal) => cal * 0.001163,
      ft_lb: (cal) => cal * 3.088,
    },
    kWh: {
      J: (kWh) => kWh * 3.6e6,
      cal: (kWh) => kWh * 859.8,
      BTU: (kWh) => kWh * 3412,
      eV: (kWh) => kWh * 2.246e25,
      Wh: (kWh) => kWh * 3.6e3,
      ft_lb: (kWh) => kWh * 2655220,
    },
    BTU: {
      J: (BTU) => BTU * 1055,
      cal: (BTU) => BTU * 0.252,
      kWh: (BTU) => BTU * 2.931e-4,
      eV: (BTU) => BTU * 6.585e21,
      Wh: (BTU) => BTU * 0.2931,
      ft_lb: (BTU) => BTU * 778.17,
    },
    eV: {
      J: (eV) => eV * 1.602e-19,
      cal: (eV) => eV * 3.828e-20,
      kWh: (eV) => eV * 4.45e-26,
      BTU: (eV) => eV * 1.602e-19,
      Wh: (eV) => eV * 4.45e-23,
      ft_lb: (eV) => eV * 1.181e-22,
    },
    Wh: {
      J: (Wh) => Wh * 3.6e3,
      cal: (Wh) => Wh * 859.8,
      kWh: (Wh) => Wh * 2.778e-7,
      BTU: (Wh) => Wh * 3.412,
      eV: (Wh) => Wh * 2.246e22,
      ft_lb: (Wh) => Wh * 2655220,
    },
    ft_lb: {
      J: (ft_lb) => ft_lb * 1.356,
      cal: (ft_lb) => ft_lb * 0.324,
      kWh: (ft_lb) => ft_lb * 3.766e-7,
      BTU: (ft_lb) => ft_lb * 1.285,
      eV: (ft_lb) => ft_lb * 8.462e18,
      Wh: (ft_lb) => ft_lb * 3.766e-4,
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
      <h2 className="text-2xl font-bold mb-4 text-center">Energy Converter</h2>
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

export default Energy;
