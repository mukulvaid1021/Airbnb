const favourite = require("../models/favourite");
const Home = require("../models/home");

exports.gethomes = (req,res,next)=>{
   Home.fetchAll().then(registeredhomes => {
     res.render("store/home-list",{registeredhomes : registeredhomes,pageTitle: "home list",currentPage: "Home",})
});
};

exports.getindex = (req,res,next)=>{
   Home.fetchAll().then(registeredhomes => {
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
  favourite.getfavourites().then(favourites =>{
    favourites = favourites.map(fav => fav.houseid);
    Home.fetchAll().then(registeredhomes => {
      console.log(favourite,registeredhomes);
      const favouritehomes = registeredhomes.filter((home)=>
      favourites.includes(home._id.toString()));
      res.render("store/favourite-list",{
      favouritehomes:favouritehomes,
      pageTitle: "My favourites",
      currentPage: "favourites",
    })
    });
  })
};

exports.postAddToFavourite = (req,res,next)=>{
  const homeid = req.body.id;
  const fav = new favourite(homeid);
  fav.save().then(result => {
    console.log('Fav added: ',result);
  }).catch(err => {
    console.log("Error while marking favourites: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  })
};

exports.postremoveFavourite = (req,res,next)=>{
  const homeid = req.params.homeid;
  favourite.deletebyid(homeid).then(result => {
    console.log('Fav removed: ',result);
  }).catch(err => {
    console.log("Error while removing favourites: ", err);
  }).finally(() => {
    res.redirect("/favourites");
  });
};

exports.gethomedetails = (req,res,next)=>{
  const homeid = req.params.homeid;
  Home.findbyid(homeid).then(home => {
    
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

