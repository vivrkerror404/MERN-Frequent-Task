var express = require("express");
var router = express.Router();
require("../db").connectToDB();
const { Country, State, City, User } = require("../model/schemaList");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// move the function to another file if apis are more

router.get("/api/fetch/country", async function (req, res) {
  try {
    const countries = await Country.find({});
    res.status(200);
    res.json({ success: 1, data: countries });
  } catch (e) {
    res.status(501);
    res.json({ success: 0, data: [] });
  }
});

router.get("/api/fetch/state/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const states = await State.find({ country: id });
    res.status(200);
    res.json({ success: 1, data: states });
  } catch (e) {
    res.status(501);
    res.json({ success: 0, data: [] });
  }
});

router.get("/api/fetch/city/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const city = await City.find({ state: id });
    res.status(200);
    res.json({ success: 1, data: city });
  } catch (e) {
    res.status(501);
    res.json({ success: 0, data: [] });
  }
});

router.get("/api/fetch/user", async function (req, res) {
  const user = await User.find({});
  res.json({ success: 1, data: user });
});

router.post("/api/formdata/save", async function (req, res) {
  const { firstName, lastName, email, country, state, city, gender, dob } =
    req.body;
  const filter = { email };
  const update = {
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    gender,
    dateOfBirth: dob,
  };
  const user = new User(update);
  user.save();
  res.json({ success: 1, message: "User saved successfully" });
});

module.exports = router;
