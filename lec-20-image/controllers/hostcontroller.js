const path = require("path");
const Home = require("../models/home");
const fs = require("fs");
const { root } = require("postcss");
exports.getaddhome = (req,res,next)=>{
  res.render('host/edit-home',{
    pageTitle : 'Add home to airbnb',
    currentPage: 'addhome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
     user: req.session.user,
  });
};

exports.getedithome = (req,res,next)=>{
  const homeid = req.params.homeid;
  const editing = req.query.editing === 'true';

 Home.findById(homeid).then((home) => {
    if(!home){
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }
   console.log(homeid, editing,home);
   res.render('host/edit-home',{
   home: home,
   pageTitle : 'Edit your Home',
   currentPage: 'host-home',
   editing: editing,
   isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
  });
};

exports.gethosthomes = (req,res,next)=>{
  Home.find().then((registeredhomes) => {
     res.render("host/host-home-list",{
      registeredhomes : registeredhomes,
      pageTitle: "host home-list",
      currentPage: "host-home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
  });
});
};
exports.postaddhome = (req,res,next)=>{
 const {housename,price,location,rating,description} = req.body;
 console.log(housename,price,location,rating,description);
 console.log(req.file);

 if (!req.file) {
  return res.status(400).send('No file uploaded.');
 }

 const photo = req.file.path;

 const home = new Home({
  housename,
  price,
  location,
  rating,
  photo,
  description
});
 home.save().then(() => {
  console.log('Home saved successfully');
 });

 res.redirect("/host/host-home-list");
};

exports.postedithome = (req,res,next)=>{
const {id,housename,price,location,rating,description} = req.body;
Home.findById(id).then((home) => {
  home.housename = housename;
  home.price = price;
  home.location = location;
  home.rating = rating;
  home.description = description;

  if (req.file) {
    fs.unlink(home.photo, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } 
    });
    home.photo = req.file.path; // Update photo only if a new file is uploaded  
  }

  home.save().then((result) => {
  console.log('Home updated', result);
 }).catch(err => {
  console.log("Error while updating ",err);
 });
 res.redirect("/host/host-home-list");
}).catch(err =>{
  console.log("Error while finding home ",err);
});
};

exports.postdeletehome = (req,res,next) => {
 const homeid = req.params.homeid;
 console.log('came to delete',homeid);
 Home.findByIdAndDelete(homeid).then(() => {
 res.redirect("/host/host-home-list");
 }).catch((error) => {
  console.log("Error while deleting",error);
 });
};

