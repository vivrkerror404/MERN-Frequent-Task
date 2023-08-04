const mongoose = require("mongoose");

const {
  countrySchema,
  stateSchema,
  citySchema,
  userSchema,
} = require("./registration");

// Create the models
const Country = mongoose.model("Country", countrySchema);
const State = mongoose.model("State", stateSchema);
const City = mongoose.model("City", citySchema);
const User = mongoose.model("User", userSchema);

module.exports = { Country, State, User, City };
