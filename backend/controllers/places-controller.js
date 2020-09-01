const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((place) => place.creator === userId);
  console.log("GET Request in Places By User");

  if (!places) {
    const error = new Error(
      "Could not find a place for the provided user id",
      404
    );
    return next(error);
  }

  res.json({ places });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;