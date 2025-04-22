const Item = require('../models/itemSchema');

// Create Item
exports.createItem = async (data) => {
  return await Item.create(data);
};

// Get All Items
exports.getAllItems = async () => {
  return await Item.find();
};

// Get Item by ID
exports.getItemById = async (id) => {
  return await Item.findById(id);
};

// Update Item
exports.updateItem = async (id, data) => {
  return await Item.findByIdAndUpdate(id, data, { new: true });
};

// Delete Item
exports.deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};
