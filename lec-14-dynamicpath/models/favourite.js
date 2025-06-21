const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtil');
const favouritedataPath = path.join(rootDir,"data","favourites.json");
//fake database

module.exports = class favourite {

static addToFavourite(homeid,callback){
  favourite.getfavourites((favourites)=>{
    if(favourites.includes(homeid)){
      callback("Home is already marked favourite");
    }
    else{
      favourites.push(homeid);
      fs.writeFile(favouritedataPath,JSON.stringify(favourites),callback);
    }
  });
}
  static getfavourites(callback) {
    fs.readFile(favouritedataPath,(err,data)=>{
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deletebyid(delhomeid,callback){
  favourite.getfavourites(homeids=>{
  homeids = homeids.filter(homeid => delhomeid !== homeid);
  fs.writeFile(favouritedataPath,JSON.stringify(homeids),callback);
  })
 }
};