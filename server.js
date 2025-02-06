const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User'); // User model

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gamingSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/', authRoutes);
app.use('/user', userRoutes);

// Define the root route
app.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file from the views directory
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
