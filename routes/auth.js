// routes/auth.js
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/profile');
      });
    }
  );
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/',
}));

module.exports = router;
