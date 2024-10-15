app.post("/updatePlan", async (req, res) => {
  const { plan } = req.body; // Assuming you are sending the selected plan from the client-side

  // Debugging: Log incoming request
  console.log("Updating plan for user:", req.session.userEmail, "to", plan);

  try {
    // Update the user's plan in the database
    const result = await collection.findOneAndUpdate(
      { email: req.session.userEmail }, // Find user by email
      { $set: { plan: plan } }, // Update plan field
      { new: true } // Return the updated document
    );

    if (!result) {
      console.log("No user found with that email.");
      return res.status(404).send("User not found.");
    }

    console.log("Updated user plan:", result.plan); // Log the updated plan
    res.redirect("/userdashboard"); // Redirect to user dashboard
  } catch (error) {
    console.error("Error updating budget plan:", error); 
    res.status(500).send("Failed to update budget plan. Please try again.");
  }
});
