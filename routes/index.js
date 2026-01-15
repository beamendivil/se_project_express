// routes/index.js
// Main router that assembles feature routers.

import express from 'express';
import clothingItemsRouter from './clothingItems.js';
import usersRouter from './users.js';

const router = express.Router();

router.use('/items', clothingItemsRouter);
router.use('/users', usersRouter);

export default router;
