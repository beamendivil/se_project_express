const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');

// GET /users/me - Returns the currently logged-in user
router.get('/me', getCurrentUser);

// PATCH /users/me - Updates the currently logged-in user
router.patch('/me', updateProfile);

// ⚠️ CRITICAL: Do not use 'export default'. Do not use { router }.
// It must be exactly this:
module.exports = router;