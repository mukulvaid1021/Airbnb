const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const favourite = require('./favourite');
const homedataPath = path.join(rootDir,"data","homes.json");
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
      if (this.id){ // edit home case
        registeredhomes = registeredhomes.map(home =>
          home.id === this.id ? this : home);
      }
      else { // add home case
        this.id = Math.random().toString();
        registeredhomes.push(this);
      }
    fs.writeFile(homedataPath,JSON.stringify(registeredhomes),(error)=>{
      console.log("File writing concluded",error);
    });
    });
  }
  static fetchAll(callback) {
    fs.readFile(homedataPath,(err,data)=>{
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findbyid(homeid,callback){
  this.fetchAll(homes=>{
    const homefound = homes.find(home => home.id === homeid);
    callback(homefound);
  })
}

static deletebyid(homeid,callback){
  this.fetchAll(homes=>{
  homes = homes.filter(home => home.id !== homeid);
  fs.writeFile(homedataPath,JSON.stringify(homes),error =>{
    favourite.deletebyid(homeid,callback);
  });
  })
}

};