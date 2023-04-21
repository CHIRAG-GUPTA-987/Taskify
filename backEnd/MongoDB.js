const mongoose = require("mongoose");
const connectToMongo = async () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
      console.log("Connected to Mongo Database");
    })
    .catch(() => {
      console.log("Connection Error!");
    });
};

module.exports = connectToMongo;
