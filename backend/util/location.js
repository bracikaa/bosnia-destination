const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${api_key}`
  );

  const data = response.data;
  console.log(data);

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find the location for specified address.",
      422
    );
    return next(error);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordForAddress;
