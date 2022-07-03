const fetch = require("node-fetch");

module.exports.getBill = async (event) => {
  console.log(event.pathParameters.id);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Please input a bill ID",
    }),
  };
};

module.exports.createBill = async () => {
  const endpoint = "https://www.billplz-sandbox.com/api/v3/";
  const key = "c7377ec0-50a6-4436-a8fb-19b3386cece6";
  const args = {
    collection_id: "lzofk7fz",
    email: "harishadi.dev@gmail.com",
    mobile: "0134567890",
    name: "Haris",
    amount: 100,
    callback_url: "https://mh-bp-fe.vercel.app/",
    description: "test-transaction",
    redirect_url: "https://mh-bp-fe.vercel.app/",
  };

  const response = await fetch(`${endpoint}bills`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + new Buffer.from(key).toString("base64"),
    },
    redirect: "follow",
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
