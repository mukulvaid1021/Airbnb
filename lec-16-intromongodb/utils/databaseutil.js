const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@completecoding.b0hjldc.mongodb.net/?retryWrites=true&w=majority&appName=CompleteCoding";

let _db;

const mongoconnect = (Callback) => {
  MongoClient.connect(MONGO_URL).then(client =>{
  Callback();
  _db = client.db('airbnb');
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoconnect = mongoconnect;
exports.getDB = getDB;


