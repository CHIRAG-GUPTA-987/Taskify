const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jsonSecret = "This is the first time I am making my own API to use React";

//Creating a new user
module.exports.createUser = async (req, res) => {
  try {
    let success = false;
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success, errors: errors.array() });

    //Refactoring body arguements
    const { userName, email, password } = req.body;
    let user = await User.findOne({ email: email });

    //Checking if the user with given email already exists or not
    if (user)
      return res
        .status(400)
        .json({
          success,
          error: "A user is already registered with that email address",
        });

    //Hashing password to protect it from attackers
    const salt = await bcrypt.genSalt(12);
    const securedPassword = await bcrypt.hash(password, salt);

    //Creating user
    user = await User.create({
      userName: userName,
      password: securedPassword,
      email: email,
    });

    //Creating auth token and sending response to the user
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtToken = jwt.sign(data, jsonSecret);
    success = true;
    res.json({ success, authToken: jwtToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Logging a user in
module.exports.loginUser = async (req, res) => {
  try {
    //Success will be true if login is successful.
    let success = false;
    //Checking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success, errors: errors.array() });
    //Refactoring body arguements
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    //Checking if the user with given email already exists or not
    if (!user)
      return res
        .status(400)
        .send(success, "Username or password may be incorrect");

    //Comparing passwords
    const passwordCompare = await bcrypt.compare(password, user.password);

    //Checking if the password is wrong
    if (!passwordCompare)
      return res
        .status(400)
        .send(success, "Username or password may be incorrect");

    //Logging in User and sending back response.
    const data = {
      user: {
        id: user.id,
      },
    };
    const jwtToken = jwt.sign(data, jsonSecret);
    success = true;
    res.json({ success, authToken: jwtToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

//Fetching details of loggedin user
module.exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
