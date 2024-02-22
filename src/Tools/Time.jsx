import React, { useState, useEffect } from "react";

const Time = () => {
  const [fromUnit, setFromUnit] = useState("s");
  const [toUnit, setToUnit] = useState("ms");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  const unitLabels = {
    s: "Second (s)",
    ms: "Millisecond (ms)",
    µs: "Microsecond (µs)",
    ns: "Nanosecond (ns)",
    min: "Minute (min)",
    hr: "Hour (hr)",
    day: "Day (day)",
    week: "Week (week)",
    month: "Month (month)",
    yr: "Year (yr)",
  };

  const conversionFormulas = {
    s: {
      ms: (s) => s * 1000,
      µs: (s) => s * 1e6,
      ns: (s) => s * 1e9,
      min: (s) => s / 60,
      hr: (s) => s / 3600,
      day: (s) => s / 86400,
      week: (s) => s / 604800,
      month: (s) => s / 2.628e6,
      yr: (s) => s / 3.154e7,
    },
    ms: {
      s: (ms) => ms / 1000,
      µs: (ms) => ms * 1000,
      ns: (ms) => ms * 1e6,
      min: (ms) => ms / 60000,
      hr: (ms) => ms / 3.6e6,
      day: (ms) => ms / 8.64e7,
      week: (ms) => ms / 6.048e8,
      month: (ms) => ms / 2.628e9,
      yr: (ms) => ms / 3.154e10,
    },
    µs: {
      s: (µs) => µs / 1e6,
      ms: (µs) => µs / 1000,
      ns: (µs) => µs * 1000,
      min: (µs) => µs / 6e7,
      hr: (µs) => µs / 3.6e9,
      day: (µs) => µs / 8.64e10,
      week: (µs) => µs / 6.048e11,
      month: (µs) => µs / 2.628e12,
      yr: (µs) => µs / 3.154e13,
    },
    ns: {
      s: (ns) => ns / 1e9,
      ms: (ns) => ns / 1e6,
      µs: (ns) => ns / 1000,
      min: (ns) => ns / 6e10,
      hr: (ns) => ns / 3.6e12,
      day: (ns) => ns / 8.64e13,
      week: (ns) => ns / 6.048e14,
      month: (ns) => ns / 2.628e15,
      yr: (ns) => ns / 3.154e16,
    },
    min: {
      s: (min) => min * 60,
      ms: (min) => min * 60000,
      µs: (min) => min * 6e7,
      ns: (min) => min * 6e10,
      hr: (min) => min / 60,
      day: (min) => min / 1440,
      week: (min) => min / 10080,
      month: (min) => min / 43800,
      yr: (min) => min / 525600,
    },
    hr: {
      s: (hr) => hr * 3600,
      ms: (hr) => hr * 3.6e6,
      µs: (hr) => hr * 3.6e9,
      ns: (hr) => hr * 3.6e12,
      min: (hr) => hr * 60,
      day: (hr) => hr / 24,
      week: (hr) => hr / 168,
      month: (hr) => hr / 730,
      yr: (hr) => hr / 8760,
    },
    day: {
      s: (day) => day * 86400,
      ms: (day) => day * 8.64e7,
      µs: (day) => day * 8.64e10,
      ns: (day) => day * 8.64e13,
      min: (day) => day * 1440,
      hr: (day) => day * 24,
      week: (day) => day * 7,
      month: (day) => day / 30.4167,
      yr: (day) => day / 365,
    },
    week: {
      s: (week) => week * 604800,
      ms: (week) => week * 6.048e8,
      µs: (week) => week * 6.048e11,
      ns: (week) => week * 6.048e14,
      min: (week) => week * 10080,
      hr: (week) => week * 168,
      day: (week) => week * 7,
      month: (week) => week / 4.34524,
      yr: (week) => week / 52.1429,
    },
    month: {
      s: (month) => month * 2.628e6,
      ms: (month) => month * 2.628e9,
      µs: (month) => month * 2.628e12,
      ns: (month) => month * 2.628e15,
      min: (month) => month * 43800,
      hr: (month) => month * 730,
      day: (month) => month * 30.4167,
      week: (month) => month * 4.34524,
      yr: (month) => month / 12,
    },
    yr: {
      s: (yr) => yr * 3.154e7,
      ms: (yr) => yr * 3.154e10,
      µs: (yr) => yr * 3.154e13,
      ns: (yr) => yr * 3.154e16,
      min: (yr) => yr * 525600,
      hr: (yr) => yr * 8760,
      day: (yr) => yr * 365,
      week: (yr) => yr * 52.1429,
      month: (yr) => yr * 12,
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
      <h2 className="text-2xl font-bold mb-4 text-center">Time Converter</h2>
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

export default Time;
