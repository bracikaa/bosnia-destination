const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordForAddress = require("../util/location");

const Place = require("../models/place");


const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let places;
  try {
    places = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  console.log("GET Request in Places");
  if (!places) {
    const error = new Error(
      "Could not find a place for the provided place id.",
      404
    );
    return next(error);
  }
  res.json({ places: places.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not get places by user id",
      500
    );
    return next(error);
  }

  console.log("GET Request in Places By User");

  if (!places || places.length === 0) {
    const error = new Error(
      "Could not find places for the provided user id",
      404
    );
    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed, please check your input data",
      422
    );
    return next(error);
  }

  const { title, description, address, creator } = req.body;
  console.log(address);
  let coordinates;
  try {
    coordinates = await getCoordForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    location: coordinates,
    address,
    image:
      "https://lh3.googleusercontent.com/proxy/ZjnpkmMu7KuzRrsY8l75fLB0xL4vNjPOZMAbtN0q1tayYQvCjr3S_QvAPo7pG5hnEVHQH1U_asCEqDaG1bF2j3TSFnSKd5Eu5ORE3vw0THUgpK8_W0Z9B5oXU0FmUNQ",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating Place failed, please try again!",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid data passed, please check your input data",
      422
    );
    return next(error);
  }

  const { title, description } = req.body;
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Ssomething went wrong, could not update place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const pid = req.params.pid;

  let place;

  try {
    place = await Place.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "Could not delete place, an issue has occured",
      500
    );
    return next(error);
  }

  try {
    place.remove();
  } catch (err) {
    const error = new HttpError(
      "Place found but couldn't be deleted, an issue has occured",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
