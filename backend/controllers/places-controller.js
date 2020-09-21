const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordForAddress = require("../util/location");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Bascarsija",
    description:
      "Bascarsija is Sarajevo's old bazaar and the historical and cultural center of the city.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Bascarsija_2016.jpg",
    address: "Baščaršija 1, Sarajevo 71000",
    location: {
      lat: 43.860266,
      lng: 18.431341,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Bascarsija",
    description:
      "Bascarsija is Sarajevo's old bazaar and the historical and cultural center of the city.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Bascarsija_2016.jpg",
    address: "Baščaršija 1, Sarajevo 71000",
    location: {
      lat: 43.860266,
      lng: 18.431341,
    },
    creator: "u1",
  },
  {
    id: "p3",
    title: "Bascarsija",
    description:
      "Bascarsija is Sarajevo's old bazaar and the historical and cultural center of the city.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Bascarsija_2016.jpg",
    address: "Baščaršija 1, Sarajevo 71000",
    location: {
      lat: 43.860266,
      lng: 18.431341,
    },
    creator: "u1",
  },
  {
    id: "p4",
    title: "Most ispod Mosta",
    description:
      "The ‘Bridge under the bridge’ was built in 1994 to shelter the citizens of Goražde when crossing the main city bridge during the war in Bosnia and Herzegovina.",
    imageUrl:
      "https://www.protectcivilians.org/wp-content/uploads/2019/01/312A9858-adj2.jpg",
    address: "Goražde",
    location: {
      lat: 43.6654873,
      lng: 18.9716204,
    },
    creator: "u1",
  },
  {
    id: "p5",
    title: "Stari Most",
    description:
      "Stari Most (literally 'Old Bridge'), also known as Mostar Bridge, is a rebuilt 16th-century Ottoman bridge in the city of Mostar in Bosnia and Herzegovina that crosses the river Neretva and connects the two parts of the city.",
    imageUrl:
      "https://s27363.pcdn.co/wp-content/uploads/2017/04/Stari-Most-at-Night.jpg.optimal.jpg",
    address: "Stari Most, Mostar 88000",
    location: {
      lat: 43.3373,
      lng: 17.815,
    },
    creator: "u1",
  },
  {
    id: "p6",
    title: "Most Mehmed-pase Sokolovica",
    description:
      "The Mehmed Paša Sokolović Bridge is a historic bridge in Višegrad, over the Drina River in eastern Bosnia and Herzegovina.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Most_mehmed_pase_sokolovica_nkd279_%282%29.JPG",
    address: "Palih boraca 6, Višegrad 73240",
    location: {
      lat: 43.7823,
      lng: 19.2881,
    },
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.find((elem) => elem.id === placeId);
  console.log("GET Request in Places");
  if (!places) {
    const error = new Error(
      "Could not find a place for the provided place id.",
      404
    );
    return next(error);
  }
  res.json({ places });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);
  console.log("GET Request in Places By User");

  if (!places || places.length === 0) {
    const error = new Error(
      "Could not find places for the provided user id",
      404
    );
    return next(error);
  }

  res.json({ places });
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

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
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

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === pid) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === pid);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const pid = req.params.pid;
  console.log(pid);
  if (!DUMMY_PLACES.find((place) => place.id === pid)) {
    const error = new HttpError("Cant find place!", 404);
    return next(error);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== pid);

  res.status(200).json({ message: "Deleted place. " });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
