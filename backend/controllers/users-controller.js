const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    const error = new HttpError("User already exists!", 422);

    return next(error);
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);

  res.status(201).json({ users: newUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    const error = new HttpError(
      "Could not identify user, wrong credentials",
      401
    );

    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
