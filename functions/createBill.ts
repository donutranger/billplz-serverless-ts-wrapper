import fetch from "node-fetch";

module.exports.createBill = async (event) => {
  const body: BillArgs = JSON.parse(event.body);
  const response = await fetch(`${process.env.API_ENDPOINT}bills`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(`${process.env.API_KEY}`).toString("base64"),
    },
    redirect: "",
    body: JSON.stringify(body),
  });

  const res = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(res);
  }
};
