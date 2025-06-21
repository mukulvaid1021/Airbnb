const Home = require("../models/home");

exports.gethomes = (req,res,next)=>{
   Home.fetchAll((registeredhomes)=>
     res.render("store/home-list",{registeredhomes : registeredhomes,pageTitle: "home-airbnb",currentPage: "Home",})
  );
};

exports.getindex = (req,res,next)=>{
   Home.fetchAll((registeredhomes)=>
     res.render("store/index",{registeredhomes : registeredhomes,pageTitle: "home-airbnb",currentPage: "index",})
  );
};

exports.gethomes = (req,res,next)=>{
   Home.fetchAll((registeredhomes)=>
     res.render("store/home-list",{registeredhomes : registeredhomes,pageTitle: "home-list",currentPage: "Home",})
  );
};
exports.getbookings = (req,res,next)=>{
  res.render("store/booking",
    {pageTitle: "My bookings",currentPage: "booking",})
};

exports.getfavouritelist = (req,res,next)=>{
  Home.fetchAll((registeredhomes)=>
  res.render("store/favourite-list",
    {registeredhomes:registeredhomes,
      pageTitle: "My favourites",
      currentPage: "favourites",
    })
  );
};
