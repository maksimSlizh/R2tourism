// server/src/routes/users.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../db'); 


router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers(); 
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id); 
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
