module.exports.createBill = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        redirectUrl: event.url
      },
    }),
  };
};
