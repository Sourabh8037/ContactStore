const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
// app.get("/", (req, res) =>
//   res.send({ msg: "Welcome To the Contact Keeper API" })
// );

// CONNECT DATABASE
connectDB();

// INIT MIDDLEWARE
app.use(express.json({ extended: false }));

// DEFINE ROUTES
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

// SERVER STATIC ASSETS IN PRODUCTION
if (process.env.NODE_ENV === "production") {
  // SET A STATIC SERVER
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.send(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("sever started on port" + PORT));
