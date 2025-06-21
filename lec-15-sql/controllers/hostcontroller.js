const Home = require("../models/home");
exports.getaddhome = (req,res,next)=>{
  res.render('host/edit-home',{
    pageTitle : 'Add home to airbnb',
    currentPage: 'addhome',
    editing: false,
  });
};

exports.getedithome = (req,res,next)=>{
  const homeid = req.params.homeid;
  const editing = req.query.editing === 'true';

 Home.findbyid(homeid).then(([homes]) => {
    const home = homes[0];
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
  });
  });
};

exports.gethosthomes = (req,res,next)=>{
  Home.fetchAll().then(([registeredhomes])=>{
     res.render("host/host-home-list",{registeredhomes : registeredhomes,pageTitle: "host home-list",currentPage: "host-home",})
});
};
exports.postaddhome = (req,res,next)=>{
 const {housename,price,location,rating,photoUrl,description} = req.body;
 const home = new Home(housename,price,location,rating,photoUrl,description);
 home.save();

 res.redirect("/host/host-home-list");
};

exports.postedithome = (req,res,next)=>{
const {id,housename,price,location,rating,photoUrl,description} = req.body;
 const home = new Home(housename,price,location,rating,photoUrl,description,id);
 home.save();
 res.redirect("/host/host-home-list");
};

exports.postdeletehome = (req,res,next) => {
 const homeid = req.params.homeid;
 console.log('came to delete',homeid);
 Home.deletebyid(homeid).then(() => {
 res.redirect("/host/host-home-list");
 }).catch(error => {
  console.log("Error while deleting",error);
 })
};

