const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { body, validationResult } = require("express-validator");


function loadRegisterPage(req, res) {
    res.render("register");
}

function loadLoginPage(req, res) {
    res.render("login");
}

const validateRegistration = [
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  body("confirm_password").custom((value, { req }) => {
      if (value !== req.body.password) {
          throw new Error("Passwords do not match");
      }
      return true;
  }),
];

async function registerUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).render("register", { 
          errors: errors.array(),
          oldData: req.body 
      });
  }

  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query(
          `INSERT INTO users (username, first_name, last_name, email, password_hash, membership_status) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
              req.body.username,
              req.body.first_name,
              req.body.last_name,
              req.body.email,
              hashedPassword, 
              req.body.membership_status ? true : false, 
          ]
      );
      res.redirect("/");
  } catch (err) {
      return next(err);
  }
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password_hash);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect("/"); 

        req.logIn(user, (err) => {
            if (err) return next(err);
            req.session.user = user;  
            res.redirect("/");
        });
    })(req, res, next);
}

function logoutUser(req, res, next) {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}


module.exports = {
    loadRegisterPage,
    loadLoginPage,
    registerUser,
    loginUser,
    logoutUser,
    validateRegistration
};