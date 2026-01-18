import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For creating tokens
import User from '../models/user.js';
import { JWT_SECRET } from '../utils/config.js';

// 1. Create User (Sign Up)
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // Hash the password before creating the user
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash, // Save the hash, not the plain password
    }))
    .then((user) => {
      // Remove password from the response object for security
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: 'Email already exists' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data passed' });
      } else {
        res.status(500).send({ message: 'An error occurred' });
      }
    });
};

// 2. Login (Sign In)
export const login = (req, res) => {
  const { email, password } = req.body;

  // Use the custom method from models/user.js
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Create a Token that expires in 7 days
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === 'Incorrect email or password') {
        res.status(401).send({ message: 'Incorrect email or password' });
      } else {
        res.status(500).send({ message: 'An error occurred' });
      }
    });
};

// 3. Get Current User (GET /users/me)
export const getCurrentUser = (req, res) => {
  // req.user._id will come from the auth middleware we build next
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: 'An error occurred' });
    });
};

// 4. Update Profile (PATCH /users/me)
export const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  // Use req.user._id to ensure they only edit their own profile
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid data passed' });
      } else {
        res.status(500).send({ message: 'An error occurred' });
      }
    });
};
