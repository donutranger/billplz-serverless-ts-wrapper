const fetch = require("node-fetch");

module.exports.getBill = async (event) => {
  console.log(event.pathParameters.id);

  const env = {
    API_KEY: process.env.API_KEY,
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_COLLECTION: process.env.API_COLLECTION,
  };

  console.log(env);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
    }),
  };
};

module.exports.createBill = async (event) => {

  console.log(JSON.parse(event.body));
  const args = {
    collection_id: process.env.API_COLLECTION,
    email: "harishadi.dev@gmail.com",
    mobile: "0134567890",
    name: "Haris",
    amount: 100,
    callback_url: "http://localhost:3000/",
    description: "test-transaction",
    redirect_url: "http://localhost:3000/",
  };

  const response = await fetch(`${process.env.API_ENDPOINT}bills`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Basic " + new Buffer.from(process.env.API_KEY).toString("base64"),
    },
    redirect: "",
    body: JSON.stringify(args),
  });

  const res = await response.json();

  // KIV: Use this only for debugging
  // console.log(res);

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  };
};
