const mongoose = require("mongoose");

const { modelType, validator } = require("./common");
// Define the Country schema
const countrySchema = new mongoose.Schema({
  name: modelType(String, true),
});

// Define the State schema
const stateSchema = new mongoose.Schema({
  name: modelType(String, true),
  country: modelType(mongoose.Schema.Types.ObjectId, true, "Country"),
});

// Define the City schema
const citySchema = new mongoose.Schema({
  name: modelType(String, true),
  state: modelType(mongoose.Schema.Types.ObjectId, true, "State"),
});

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: modelType(String, true, null, /^[A-Za-z]+$/),
  lastName: modelType(String, true, null, /^[A-Za-z]+$/),
  email: modelType(
    String,
    true,
    null,
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  ),
  country: modelType(String, true),
  state: modelType(String, true),
  city: modelType(String, true),
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: modelType(Date, true, null, null, validator),
  age: modelType(String, false),
});

// Before saving the document, calculate the age and store it in the 'age' field
userSchema.pre("save", function (next) {
  const currentDate = new Date();
  const dob = this.dateOfBirth;
  const ageInMillis = currentDate - dob;
  const ageDate = new Date(ageInMillis); // Convert the age in milliseconds to a Date object
  this.age = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the age
  next();
});

module.exports = { countrySchema, stateSchema, citySchema, userSchema };
