const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const items = require('./routes/api/items');
const app = express();
const path = require('path');

// Bodyparser Middleware
app.use(bodyParser.json());

// Mongo DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db,  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);


// Serve static assetts if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    //app.use(express.static('client/build'));
    app.use('/static', express.static(path.join(__dirname, 'client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));