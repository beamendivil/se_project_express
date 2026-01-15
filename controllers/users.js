// controllers/users.js
// User controllers: getUsers, getUser, createUser

import mongoose from 'mongoose';
import User from '../models/user.js';
import { INVALID_DATA_ERROR, NOT_FOUND_ERROR } from '../utils/errors.js';

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const getUser = (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid user id' });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return next({ statusCode: NOT_FOUND_ERROR, message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data' });
      }
      return next(err);
    });
};

export const createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next({ statusCode: INVALID_DATA_ERROR, message: 'Invalid data when creating user' });
      }
      return next(err);
    });
};

