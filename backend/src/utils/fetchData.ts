import axios from "axios";
import { writeFileSync } from "fs";
import { parse } from "json2csv";

// Function to fetch historical data for Zora AI from CoinGecko
const fetchZoraDataFromCoinGecko = async () => {
  const coinId = "zora-ai"; // CoinGecko coin ID for Zora AI
  const vsCurrency = "usd";
  const fromDate = new Date("2025-01-09"); // Zora AI launch date
  const toDate = new Date(); // Current date

  // Convert dates to UNIX timestamps (in seconds)
  const fromTimestamp = Math.floor(fromDate.getTime() / 1000);
  const toTimestamp = Math.floor(toDate.getTime() / 1000);

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range`,
      {
        params: {
          vs_currency: vsCurrency,
          from: fromTimestamp,
          to: toTimestamp,
        },
      }
    );

    const prices = response.data.prices; // Array of [timestamp, price]
    return prices.map((entry: any) => ({
      timestamp: new Date(entry[0]).toISOString(),
      price: entry[1],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Function to convert data to CSV and save to a file
const saveDataToCSV = async () => {
  const data = await fetchZoraDataFromCoinGecko();
  if (data.length > 0) {
    try {
      const csv = parse(data);
      writeFileSync("zora-price-history-from-beginning.csv", csv);
      console.log("Data saved to zora-price-history-from-beginning.csv");
    } catch (error) {
      console.error("Error writing to CSV:", error);
    }
  } else {
    console.log("No data to save.");
  }
};

// Run the function to fetch data and save to CSV
saveDataToCSV();
