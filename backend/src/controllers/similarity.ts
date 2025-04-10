import { Request, Response } from "express";
import { fetchNewCoins } from "../utils/fetchNewCoins";
import { fetchCoinData } from "../utils/coinData";
import axios from "axios";

export const calculateTotalSimilarity = async (req: Request, res: Response) => {
  try {
    const newCoins = await fetchNewCoins();
    const coinData = await fetchCoinData();

    const exampleCoinRaw = newCoins[0];

    const exampleCoin = cleanObject(exampleCoinRaw!);

    const cleanedCoinData = coinData?.map((coin) => cleanObject(coin));

    const payload = {
      example_post: exampleCoin,
      coin_data: cleanedCoinData,
    };

    const response = await axios.post("http://127.0.0.1:5000/predict", payload);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function cleanObject(obj: Record<string, any>): Record<string, any> {
  const cleaned: Record<string, any> = {};
  for (const key in obj) {
    if (
      typeof obj[key] === "string" &&
      (obj[key] === null || obj[key] === undefined)
    ) {
      cleaned[key] = "";
    } else {
      cleaned[key] = obj[key] ?? ""; // Replace null/undefined with '' if any type
    }
  }
  return cleaned;
}
