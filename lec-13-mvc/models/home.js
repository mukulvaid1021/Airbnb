const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
//fake database

module.exports = class Home {
  constructor(housename,price,location,rating,photoUrl) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredhomes)=>{
      registeredhomes.push(this);
    const homedataPath = path.join(rootDir,"data","homes.json");
    fs.writeFile(homedataPath,JSON.stringify(registeredhomes),error=>{
      console.log("File writing concluded",error);
    });
    });
  }
  static fetchAll(callback) {
    const homedataPath = path.join(rootDir,"data","homes.json");
    fs.readFile(homedataPath,(err,data)=>{
      callback(!err ? JSON.parse(data) : []);
    });
  }
};