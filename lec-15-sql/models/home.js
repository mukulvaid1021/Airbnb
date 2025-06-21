const db = require("../utils/databaseutil");

module.exports = class Home {
  constructor(housename,price,location,rating,photoUrl,description,id) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id){
       return db.execute('UPDATE  homes SET housename=?,price=?,location=?,rating=?,photoUrl=?,description=? WHERE id=?',[this.housename, this.price, this.location, this.rating, this.photoUrl,this.description, this.id]);
    }
    else{
       return db.execute('INSERT INTO homes (housename,price,location,rating,photoUrl,description) VALUES (?, ?, ?, ?, ?, ?)',[this.housename, this.price, this.location, this.rating, this.photoUrl,this.description]);
    }
  }
  static fetchAll() {
    return db.execute('SELECT * FROM homes');
  }

static findbyid(homeid){
  return db.execute('SELECT * FROM homes WHERE id=?',[homeid]);
}

static deletebyid(homeid){
  return db.execute('DELETE FROM homes WHERE id=?',[homeid]);
}

};