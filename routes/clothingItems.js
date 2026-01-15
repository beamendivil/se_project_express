// routes/clothingItems.js
// Clothing item routes: GET /items, POST /items, DELETE /items/:itemId

import express from 'express';
import {
	getClothingItems,
	createClothingItem,
	deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
	} from '../controllers/clothingItems.js';

const router = express.Router();

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:itemId', deleteClothingItem);
router.put('/:itemId/likes', likeClothingItem);
router.delete('/:itemId/likes', dislikeClothingItem);

export default router;
