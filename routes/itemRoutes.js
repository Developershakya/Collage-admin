const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// CRUD Routes
router.post('/items', itemController.addItem);         // Create
router.get('/items', itemController.getItems);          // Read All
router.get('/items/:id', itemController.getItem);       // Read One
router.put('/items/:id', itemController.updateItem);    // Update
router.delete('/items/:id', itemController.deleteItem); // Delete

module.exports = router;
