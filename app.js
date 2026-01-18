const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { login, createUser } = require('./controllers/users');
const { getClothingItems } = require('./controllers/clothingItems');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const clothingItemsRouter = require('./routes/clothingItems');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

const app = express();
const { PORT = 3001 } = process.env;

// Enable CORS
app.use(cors());
app.use(express.json());

// --- PUBLIC ROUTES (Must be BEFORE auth) ---
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/items', getClothingItems);

// --- AUTHORIZATION MIDDLEWARE ---
// This protects everything below it
app.use(auth);

// --- PROTECTED ROUTES ---
app.use('/users', usersRouter);
app.use('/items', clothingItemsRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});