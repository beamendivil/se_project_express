const ClothingItem = require('../models/clothingItem');

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data passed' });
      } else {
        res.status(500).send({ message: 'An error occurred' });
      }
    });
};

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => res.status(500).send({ message: 'An error occurred' }));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: 'Item not found' });
      }
      if (String(item.owner) !== String(req.user._id)) {
        return res.status(403).send({ message: 'You are not authorized to delete this item' });
      }
      return item.deleteOne()
        .then(() => res.send({ message: 'Item deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else {
        res.status(500).send({ message: 'An error occurred' });
      }
    });
};

// --- CRITICAL PART: EXPORT ALL FUNCTIONS ---
module.exports = {
  createClothingItem,
  getClothingItems,
  deleteItem, 
};