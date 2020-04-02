const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const users = require('./routes/api/users');
const items = require('./routes/api/items');
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// Mongo DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db,  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);
app.use('/api/items', items);

// Catch all routes
app.get('*', (req, res) => {
    res.send("Main Page");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));