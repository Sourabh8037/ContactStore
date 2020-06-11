const express = require("express");

const app = express();
app.get("/", (req, res) =>
  res.send({ msg: "Welcome To the Contact Keeper API" })
);

//DEFINE ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("sever started on port" + PORT));
