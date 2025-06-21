const { getDB } = require("../utils/databaseutil");

module.exports = class favourite {
  constructor(houseid) {
    this.houseid = houseid;
  }

  save() {
    const db = getDB();
    return db.collection('favourites').findOne({houseid: this.houseid}).then(existingFav => {
      if (!existingFav) {
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    });
  }

  static getfavourites(callback) {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deletebyid(delhomeid,callback) {
  const db = getDB();
  return db.collection('favourites').deleteOne({houseid: delhomeid});
 }
};