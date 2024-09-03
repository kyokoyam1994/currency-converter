// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [convertedValue, setConvertedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convertCurrency() {
      setIsLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
      );

      if (!response.ok) {
        setConvertedValue("");
        setIsLoading(false);
        return;
      }

      const json = await response.json();

      if (json?.rates?.[`${currencyTo}`]) {
        setConvertedValue(json.rates[`${currencyTo}`]);
      } else {
        setConvertedValue("");
      }
      setIsLoading(false);
    }

    if (currencyFrom === currencyTo && !isNaN(+amount)) {
      setConvertedValue(amount);
    } else {
      convertCurrency();
    }
  }, [amount, currencyFrom, currencyTo]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={currencyFrom}
        onChange={(e) => setCurrencyFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currencyTo}
        onChange={(e) => setCurrencyTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {isLoading
          ? "Loading..."
          : `${convertedValue} ${convertedValue && currencyTo}`}
      </p>
    </div>
  );
}
