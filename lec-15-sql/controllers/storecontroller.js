const favourite = require("../models/favourite");
const Home = require("../models/home");

exports.gethomes = (req,res,next)=>{
   Home.fetchAll().then(([registeredhomes]) => {
     res.render("store/home-list",{registeredhomes : registeredhomes,pageTitle: "home list",currentPage: "Home",})
});
};

exports.getindex = (req,res,next)=>{
   Home.fetchAll().then(([registeredhomes])=>{
    res.render("store/index",{
      registeredhomes : registeredhomes,
      pageTitle: "home-airbnb",
      currentPage: "index",
    })
   });
};

exports.getbookings = (req,res,next)=>{
  res.render("store/booking",
    {pageTitle: "My bookings",currentPage: "booking",})
};

exports.getfavouritelist = (req,res,next)=>{
  favourite.getfavourites(favourites =>{
    Home.fetchAll().then(([registeredhomes])=>{
      const favouritehomes = registeredhomes.filter(home=>
      favourites.includes(home.id));
      res.render("store/favourite-list",{
      favouritehomes:favouritehomes,
      pageTitle: "My favourites",
      currentPage: "favourites",
    })
    });
  })
};

exports.postAddToFavourite = (req,res,next)=>{
  favourite.addToFavourite(req.body.id,error => {
    if(error){
      console.log("Error while marking favourite:",error);
    }
     res.redirect("/favourites");
  })
}

exports.postremoveFavourite = (req,res,next)=>{
  const homeid = req.params.homeid;
  favourite.deletebyid(homeid,error => {
    if (error) {
      console.log("Error while removing from favourite:",error);
    }
     res.redirect("/favourites");
  })
}

exports.gethomedetails = (req,res,next)=>{
  const homeid = req.params.homeid;
  Home.findbyid(homeid).then(([homes]) => {
    const home = homes[0];
    if (!home){
      console.log("Home not found");
      res.redirect("/homes");
    }
    else{
      res.render("store/home-details",{
      home: home,
      pageTitle: "Home Details",
      currentPage: "Home",
    });
  }
  })
};

