const mongoose = require('mongoose');
const mongoURI = `mongodb+srv://abdulwahab:${process.env.DATABASE_PASSWORD}@points-perk.xl7zy3m.mongodb.net/points-perk`;

const connectToMongo = async () => {

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully!");
  } catch(error) {
    console.log("Error connecting to MongoDB", error);
  }

}

module.exports = connectToMongo;