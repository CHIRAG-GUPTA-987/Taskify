const mongoose = require('mongoose');
const connectToMongo = async ()=>{
    mongoose.connect('mongodb://localhost:27017/i-notebook')
        .then(()=>{
            console.log('Connected to Mongo Database');
        })
        .catch(()=>{
            console.log('Connection Error!');
        })
}

module.exports = connectToMongo;