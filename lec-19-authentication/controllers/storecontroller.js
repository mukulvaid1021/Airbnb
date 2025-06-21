const Home = require("../models/home");
const User = require("../models/user");
exports.gethomes = (req, res, next) => {
  Home.find().then((registeredhomes) => {
    res.render("store/home-list", {
      registeredhomes: registeredhomes,
      pageTitle: "home list",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getindex = (req, res, next) => {
  console.log("Session Value: ", req.session);
  Home.find().then((registeredhomes) => {
    res.render("store/index", {
      registeredhomes: registeredhomes,
      pageTitle: "home-airbnb",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getbookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: "My bookings",
    currentPage: "booking",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getfavouritelist = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");
  res.render("store/favourite-list", {
    favouritehomes: user.favourites,
    pageTitle: "My favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeid = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeid)) {
    user.favourites.push(homeid);
    await user.save()
  }
      res.redirect("/favourites");
};

exports.postremoveFavourite = async (req, res, next) => {
  const homeid = req.params.homeid;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeid)) {
    user.favourites = user.favourites.filter(fav => fav != homeid);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.gethomedetails = (req, res, next) => {
  const homeid = req.params.homeid;
  Home.findById(homeid).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};
