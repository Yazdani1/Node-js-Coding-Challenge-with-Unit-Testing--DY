const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

// to register
exports.userRegistration = async (req, res) => {
  const { teamname, email, password,role } = req.body;

  try {

    if (!teamname) {
      return res.status(422).json({ error: "please add team name" });
    }


    if (!email) {
      return res.status(422).json({ error: "please add email" });
    }
    if (!password) {
      return res.status(422).json({ error: "please add password" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exist with same email address" });
    }
    const hash_password = await bcrypt.hash(password, 10);

    userDetails = new User({
      teamname,
      email,
      role,
      password: hash_password,
    });

    const createUserAccount = await User.create(userDetails);

    res
      .status(201)
      .json({ createUserAccount, message: "Account Created Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Account could not create" });
    console.log(error)
  }
};

// to log in
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "add your register email" });
    }
    if (!password) {
      return res.status(400).json({ error: "add your password" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Account could not found " });
    }
    const isMatchData = await bcrypt.compare(password, user.password);
    if (!isMatchData) {
      return res.status(400).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong, Could not Log In" });
  }
};

// to get all the user list and only admin can have access it

exports.getAllUser = async (req, res) => {
  try {
    const userlist = await User.find().sort({ date: -1 });
    res.status(200).json(userlist);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};

// to get current user role for admin area in frontend side

exports.getCurrentUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};

// to delete user account- only admin can do it..

exports.deleteUserAccount = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };
    const singleUser = await User.findById(deleteQuery);

    if (!singleUser) {
      return res.status(400).json({ error: "User could not found" });
    }

    const deleteuser = await User.findByIdAndDelete(deleteQuery);

    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(400).json({ error: "Something Went Wrong" });
  }
};
