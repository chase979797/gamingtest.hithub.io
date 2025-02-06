// routes/user.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('profile', { user: req.user });
});

router.post('/addFriend', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  User.findById(req.user.id, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    user.friends.push(req.body.friendId);
    user.save((err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.redirect('/profile');
    });
  });
});

module.exports = router;
