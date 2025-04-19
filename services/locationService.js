const mongoose = require("mongoose");
const Location = require("../models/locationSchema");

const createLocation = async (data) => {
  return await Location.create(data);
};

const getAllLocation = async () => {
  return await Location.find();
};

const deleteLocation = async (id) => {
  return await Location.findByIdAndDelete(id);
};

const updateLocation = async (id, data) => {
  return await Location.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  createLocation,
  getAllLocation,
  deleteLocation,
  updateLocation,
};
