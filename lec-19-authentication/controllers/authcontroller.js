const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
     oldInput: {
      email: ""
     },
     user: {},
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/Signup", {
    pageTitle: "Signup",
    currentPage: "Signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      usertype: "",
      user: {},
    },
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User not found with this email"],
      oldInput: { email},
      user: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Incorrect password"],
      oldInput: { email },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postSignup = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only alphabets"),

  check("lastname")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("usertype")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type selected"),

  check("terms")
    .notEmpty()
    .withMessage("You must agree to the terms and conditions")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("You must agree to the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const { firstname, lastname, email, password, usertype } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/Signup", {
        pageTitle: "Signup",
        currentPage: "Signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstname,
          lastname,
          email,
          usertype,
        },
        user: {},
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          usertype,
        });
        return user.save();
      })
      .then(() => {
        console.log("User created successfully");
        res.redirect("/login");
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).render("auth/Signup", {
          pageTitle: "Signup",
          currentPage: "Signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            firstname,
            lastname,
            email,
            usertype,
          },
          user: {},
        });
      });
  },
];

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
