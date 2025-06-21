const Home = require("../models/home");
exports.getaddhome = (req,res,next)=>{
  res.render('host/addhome',{pageTitle : 'Add home to airbnb',currentPage: 'addhome'});
};


exports.gethosthomes = (req,res,next)=>{
   Home.fetchAll((registeredhomes)=>
     res.render("host/host-home-list",{registeredhomes : registeredhomes,pageTitle: "host home-list",currentPage: "host-Home",})
  );
};
exports.postaddhome = (req,res,next)=>{
  console.log('Home registration successfully for:',req.body);

 const {housename,price,location,rating,photoUrl} = req.body;
 const home = new Home(housename,price,location,rating,photoUrl);
 home.save();

  res.render('host/addedhome',{pageTitle : 'home added successfully',currentPage: 'addedhome'});
};

