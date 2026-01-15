// controllers/clothingItems.js
// Clothing item controllers: getClothingItems, createClothingItem, deleteClothingItem

import mongoose from 'mongoose';
import ClothingItem from '../models/clothingItem.js';
import { INVALID_DATA_ERROR, NOT_FOUND_ERROR } from '../utils/errors.js';

export const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

export const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  // Temporary: use the hardcoded test user id from auth middleware as owner
  // This will log the id to verify it is available on the request
  console.log(req.user._id);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data when creating item' });
      }
      return next(err);
    });
};

export const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid item id' });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return next({ statusCode: NOT_FOUND_ERROR, message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data' });
      }
      return next(err);
    });
};

const handleLikeStatus = (req, res, next, update) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid item id' });
  }

  return ClothingItem.findByIdAndUpdate(itemId, update, { new: true })
    .then((item) => {
      if (!item) {
        return next({ statusCode: NOT_FOUND_ERROR, message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data' });
      }
      return next(err);
    });
};

export const likeClothingItem = (req, res, next) =>
  handleLikeStatus(req, res, next, { $addToSet: { likes: req.user._id } });

export const dislikeClothingItem = (req, res, next) =>
  handleLikeStatus(req, res, next, { $pull: { likes: req.user._id } });

