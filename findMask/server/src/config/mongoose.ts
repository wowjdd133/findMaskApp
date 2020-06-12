import mongoose from 'mongoose';
import 'dotenv/config';

module.exports = function () {
  mongoose.Promise = global.Promise;
  const db = mongoose.connect(process.env["MONGO_DB"], { 
    useUnifiedTopology: true,
    useNewUrlParser: true}); 

  return db;
}

