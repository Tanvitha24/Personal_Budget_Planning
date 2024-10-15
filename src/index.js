const express = require("express");
const session = require('express-session');
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));

// Middleware for session handling
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true for HTTPS
}));

// Middleware to check if the user is logged in
function checkAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next(); // Proceed if logged in
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
}

// Sample login route
app.post('/login', async (req, res) => {
  try {
    // Find user by email
    const check = await collection.findOne({ email: req.body.email });

    // Check if user exists and password matches
    if (check && check.password === req.body.password) {
      // Set session variables for authentication
      req.session.isAuthenticated = true;
      req.session.userName = check.name; // Store user name or other info
      res.render('user/userdashboard', { user: check });  // Redirect to dashboard
    } else {
      // Redirect to error page with custom message
      res.render('error', { message: "Invalid email or password. Please try again." });
    }
  } catch (error) {
    // Redirect to error page in case of server or other errors
    res.render('error', { message: "An error occurred. Please try again later." });
  }
});


// Logout route
// app.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.send("Error logging out.");
//     }
//     res.redirect('/login'); // Redirect to login after logout
//   });
// });



app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send("Could not log out. Please try again.");
      }

      // Redirect to login page or home page after logout
      res.redirect('/login');
  });
});



// Protected route (only accessible if logged in)
app.get('/dashboard', checkAuth, (req, res) => {
  res.render("user/user", { userName: req.session.userName });
});

// Signup route
// Signup route
app.post("/signup", async (req, res) => {
  try {
    // Check if email already exists in the collection
    const existingUser = await collection.findOne({ email: req.body.email });

    if (existingUser) {
      // Render error page with a custom message if email already exists
      res.render("error", {
        statusCode: 409, // 409 Conflict
        message: "Email already exists. Please use another email."
      });
    } else {
      // Data object to be inserted into the database
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        income: req.body.income,
        age: req.body.age,
        phonenumber: req.body.phonenumber,
        occupation: req.body.occupation
      };

      // Insert data into the collection
      await collection.insertMany([data]);

      // Render success page after successful signup
      res.render("success", { userName: req.body.name });
    }
  } catch (error) {
    // Render error page with a custom message in case of a server error
    res.render("error", {
      statusCode: 500, // 500 Internal Server Error
      message: "An internal error occurred. Please try again later."
    });
  }
});





// Routes for rendering pages
app.get("/", (req, res) => {
  res.render("home", {
    isAuthenticated: req.session.isAuthenticated || false,
    userName: req.session.userName || null,
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/user", (req, res) => {
  res.render("user/user.hbs");
});

// app.get("/userdashboard", (req, res) => {
//   res.render("user/userdashboard.hbs");
// });


app.get('/userdashboard', checkAuth, async (req, res) => {
  try {
    // Fetch the user details from MongoDB using the user's session data
    const user = await collection.findOne({ name: req.session.userName });

    if (user) {
      // Render the dashboard page with the user's data
      res.render('user/userdashboard', { user });
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res.send("An error occurred. Please try again.");
  }
});



app.get("/traceexpense", (req, res) => {
  res.render("user/traceexpense.hbs");
});

app.listen(4015, () => {
  console.log("Port connected");
});
