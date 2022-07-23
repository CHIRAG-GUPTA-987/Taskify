const express = require('express');
var cors = require('cors');
const app = express();
const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');

//Connecting to Mongo Database
const connectToMongo = require('./MongoDB');
connectToMongo();

//Using cors
app.use(cors());

//Converting request body to json
app.use(express.json());         

//Converting url body to json
// app.use(express.urlencoded({extended: true}));

//User routes
app.use('/auth', authRoute);

//Notes routes
app.use('/notes', notesRoute);

app.listen(4000, ()=>{
    console.log('Serving on port 4000');
})