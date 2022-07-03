import { BillArgs } from "./types";
import fetch from "node-fetch";

module.exports.getBill = async (event) => {
  const id = event.pathParameters.id;
  const encoded: string = Buffer.from(
    process.env.API_KEY ?? "",
    "utf8"
  ).toString("base64");

  const response = await fetch(`${process.env.API_ENDPOINT}bills/${id}`, {
    method: "GET",
    // KIV: Disable this once on prod
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + encoded,
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
    collection_id: process.env.API_COLLECTION,
  };
  const encoded: string = Buffer.from(
    process.env.API_KEY ?? "",
    "utf8"
  ).toString("base64");

  const response = await fetch(`${process.env.API_ENDPOINT}bills`, {
    method: "POST",
    // KIV: Disable this once on prod
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + encoded,
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
