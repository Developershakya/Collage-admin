const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state:   { type: String, required: true },
  city:    { type: String, required: true },
  loc:     { type: String, unique: true } // optional, computed field
});

// Automatically set `loc` before saving
locationSchema.pre('save', function (next) {
  this.loc = `${this.city}, ${this.state}, ${this.country}`;
  next();
});

module.exports = mongoose.model("Location", locationSchema);
