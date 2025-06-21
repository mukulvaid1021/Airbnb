const { ObjectId } = require('mongodb');
const {getDB} = require('../utils/databaseutil');

module.exports = class Home {
  constructor(housename,price,location,rating,photoUrl,description,_id) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if(_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) { //update
      const updateFields = {
       housename: this.housename,
       price: this.price,
       location: this.location,
       rating: this.rating,
       photoUrl: this.photoUrl,
       description: this.description,
      };

      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
    }
    else{ // insert
       return db.collection('homes').insertOne(this);
    }
  }
  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }

static findbyid(homeid){
  console.log(homeid);
  const db = getDB();
  return db.collection('homes').find({_id: new ObjectId(String(homeid))}).
  next();
}

static deletebyid(homeid){
  const db = getDB();
  return db.collection('homes')
  .deleteOne({_id: new ObjectId(String(homeid))});
}
};