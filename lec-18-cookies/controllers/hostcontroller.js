const Home = require("../models/home");
exports.getaddhome = (req,res,next)=>{
  res.render('host/edit-home',{
    pageTitle : 'Add home to airbnb',
    currentPage: 'addhome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
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
  });
});
};
exports.postaddhome = (req,res,next)=>{
 const {housename,price,location,rating,photoUrl,description} = req.body;
 const home = new Home({
  housename,
  price,
  location,
  rating,
  photoUrl,
  description
});
 home.save().then(() => {
  console.log('Home saved successfully');
 });

 res.redirect("/host/host-home-list");
};

exports.postedithome = (req,res,next)=>{
const {id,housename,price,location,rating,photoUrl,description} = req.body;
Home.findById(id).then((home) => {
  home.housename = housename;
  home.price = price;
  home.location = location;
  home.rating = rating;
  home.photoUrl = photoUrl;
  home.description = description;

  home.save().then((result) => {
  console.log('Home updated', result);
 }).catch(err => {
  console.log("Error while updating ",err);
 })
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

