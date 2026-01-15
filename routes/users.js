// routes/users.js
// User routes: GET /users, GET /users/:userId, POST /users

import express from 'express';
import { getUsers, getUser, createUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

export default router;
