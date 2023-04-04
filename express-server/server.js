const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const cors = require("cors");

const app = express();
app.use(cors());

// Configure session middleware some
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize PassportJS middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [
  {
    id: 1,
    email: "admin@admin.com",
    username: "admin",
    password: "admin",
    name: "Admin McAdmin",
  },
  {
    id: 2,
    email: "adamkrieger87@gmail.com",
    username: "adam",
    password: "secret",
    name: "Adam Krieger",
  }
];

passport.use(
  new LocalStrategy(function (username, password, done) {
    // usefull for local array
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
    
    // usefull for database connection
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   if (!user.verifyPassword(password)) {
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_KEY,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback",
      session: true,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = users.find((user) => user.email === profile.emails[0].value);
      if (!user) {
        return done(null, false);
      }

      user.photos = profile.photos;      
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.post("/api/login", passport.authenticate("local", { failureRedirect: "http://localhost:login" }), function (req, res) {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(500).json({});
  }
});

app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000",
  })
);

app.get("/api/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(500).json({});
  }
});

app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
