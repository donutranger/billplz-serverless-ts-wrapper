import { BillArgs } from "./types";
import fetch from "node-fetch";

const API_KEY = Buffer.from(process.env.API_KEY ?? "", "utf8").toString(
  "base64"
);
const API_ENDPOINT = process.env.API_ENDPOINT;
const COLLECTION_ID = process.env.API_COLLECTION;

module.exports.getBill = async (event) => {
  const id = event.pathParameters.id;

  const response = await fetch(`${API_ENDPOINT}bills/${id}`, {
    method: "GET",
    // KIV: Disable this once on prod
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + API_KEY,
    },
  });

  const res = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: res,
    }),
  };
};

module.exports.createBill = async (event) => {
  const args: BillArgs = {
    ...JSON.parse(event.body),
    collection_id: COLLECTION_ID,
    callback_url:
      "http://localhost:8000/processBill",
  };

  const response = await fetch(`${API_ENDPOINT}bills`, {
    method: "POST",
    // KIV: Disable this once on prod
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + API_KEY,
    },
    redirect: "",
    body: JSON.stringify(args),
  });

  const res = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};

module.exports.processBill = async (event) => {
  console.log(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
    }),
  };
};
