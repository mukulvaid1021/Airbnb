const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.gethomes = (req,res,next)=>{
   Home.find().then(registeredhomes => {
     res.render("store/home-list",{registeredhomes : registeredhomes,pageTitle: "home list",currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
     })
});
};

exports.getindex = (req,res,next)=>{
  console.log("Session Value: ", req.session);
   Home.find().then((registeredhomes) => {
    res.render("store/index",{
      registeredhomes : registeredhomes,
      pageTitle: "home-airbnb",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
   });
};

exports.getbookings = (req,res,next)=>{
  res.render("store/booking",
    {pageTitle: "My bookings",
      currentPage: "booking",
      isLoggedIn: req.isLoggedIn,
    });
};

exports.getfavouritelist = (req,res,next)=>{
  Favourite.find()
  .populate('houseid')
  .then((favourites) =>{
    const favouritehomes = favourites.map((fav) => fav.houseid);
      res.render("store/favourite-list",{
      favouritehomes:favouritehomes,
      pageTitle: "My favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
    });
    });
};

exports.postAddToFavourite = (req,res,next)=>{
  const homeid = req.body.id;
  Favourite.findOne({houseid : homeid}).then((fav) => {
    if (fav) {
      console.log("Already marked as favoutite");
    }
    else{
      fav = new Favourite({houseid: homeid});
      fav.save().then((result) => {
        console.log("Fav added: ",result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourites: ",err);
  });
};

exports.postremoveFavourite = (req,res,next)=>{
  const homeid = req.params.homeid;
  Favourite.findOneAndDelete({houseid: homeid}).then((result )=> {
    console.log('Fav removed: ',result);
  }).catch(err => {
    console.log("Error while removing favourites: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.gethomedetails = (req,res,next)=>{
  const homeid = req.params.homeid;
  Home.findById(homeid).then(home => {
    
    if (!home){
      console.log("Home not found");
      res.redirect("/homes");
    }
    else{
      res.render("store/home-details",{
      home: home,
      pageTitle: "Home Details",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn
    });
  }
  })
};

