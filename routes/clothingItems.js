const router = require('express').Router();
const { createClothingItem, getClothingItems, deleteItem } = require('../controllers/clothingItems');

// POST /items
router.post('/', createClothingItem);

// DELETE /items/:itemId
router.delete('/:itemId', deleteItem);

module.exports = router;