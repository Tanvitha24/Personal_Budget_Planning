// /routes/auth.js
const express = require("express");
const router = express.Router();
const collection = require("../src/mongodb"); // Adjust the path if necessary

// Render Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle Signup Form Submission
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation (you can enhance this)
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const newUser = { name, email, password };

    // Insert new user into the database
    await collection.insertOne(newUser);

    // Optionally, set session or redirect
    req.session.userId = newUser._id; // Assuming MongoDB assigns _id
    res.redirect("/"); // Redirect to home
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send("An error occurred during signup.");
  }
});

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login Form Submission
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Find user by email
    const user = await collection.findOne({ email });

    // Validate user and password
    if (user && user.password === password) { // Consider hashing passwords in production
      req.session.userId = user._id; // Set session
      res.redirect("/"); // Redirect to home
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("An error occurred during login.");
  }
});


// /routes/auth.js (Add this middleware within the same file or create a separate middleware file)
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/auth/login");
}

// Example usage: Protect the services route
// Modify /routes/services.js
const express = require("express");
const router = express.Router();

// Middleware to protect the services route
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/auth/login");
};

// Services route (protected)
router.get("/", isAuthenticated, (req, res) => {
  res.render("services");
});


// /routes/auth.js (Add the logout route within the same file)
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/");
  });
});

module.exports = router;

