import { BillArgs } from "./types";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import * as AWS from "aws-sdk";

const API_KEY = Buffer.from(process.env.API_KEY ?? "", "utf8").toString(
  "base64"
);
const API_ENDPOINT = process.env.API_ENDPOINT;
const COLLECTION_ID = process.env.API_COLLECTION;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

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
    callback_url: WEBHOOK_URL,
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
  const {
    id,
    collection_id,
    name,
    amount,
    paid_amount,
    mobile,
    due_at,
    paid_at,
  } = event.body;
  const txn_id = uuidv4();

  console.log("Name", name);
  console.log("BillId", txn_id);

  const params = {
    TableName: USERS_TABLE,
    Item: {
      txnId: txn_id,
      bill_id: id,
      collection_id,
      name,
      amount,
      paid_amount,
      mobile,
      due_at,
      paid_at,
    },
  };

  try {
    await dynamoDbClient.put(params as any).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "OK",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not create transaction id",
      }),
    };
  }
};
