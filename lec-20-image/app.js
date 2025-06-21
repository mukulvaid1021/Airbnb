// core module
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session'
)(session);
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const DB_PATH = "mongodb+srv://root:root@completecoding.b0hjldc.mongodb.net/airbnb?retryWrites=true&w=majority&appName=CompleteCoding";
const path = require('path');
// External module
const express = require('express');
//Local Module
const storeRouters = require("./routes/storeRouters")
const hostRouter = require("./routes/hostRouter")
const authRouters = require("./routes/authRouters");
const rootDir = require("./utils/pathUtil");
const errorscontroller = require("./controllers/error");


const app = express();

app.set('view engine','ejs');
app.set('views','views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

const randomString = (lenght) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < lenght; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multeroptions = {
  storage,fileFilter
};

app.use(express.urlencoded());
app.use(multer(multeroptions).single('photo'));
app.use(express.static(path.join(rootDir,'public',)))
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/host/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/homes/uploads', express.static(path.join(rootDir, 'uploads')));

app.use(session({
  secret: "Mukul vaid ",
  resave: false, 
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})


app.use(authRouters);
app.use(storeRouters);
app.use("/host", (req, res,next) => {
  if (req.isLoggedIn) {
    next();
  }
  else{
    res.redirect("/login");
  }
});
app.use("/host",hostRouter);

app.use(errorscontroller.pagenotfound);

const PORT = 3000;

mongoose.connect(DB_PATH).then(() => {
  console.log('connected to Mongo');
  app.listen(PORT,() => {
console.log(`server is running on http://localhost:${PORT}`);
});
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
