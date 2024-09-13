const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/user");
const indexRouter = require("./routes/index");
const cors = require("cors");

const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

async function main() {
  await mongoose.connect(`mongodb://localhost:27017/paytm`);
}

app.get("/", (req, res) => {
  res.json({
    message: "Working in Home",
  });
});

app.use("/api/v1", indexRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// app.get("/adduser", async (req, res) => {
//   const user = new User({
//     username: "zeeshanhassan",
//     firstName: "Muhammad Zeeshan",
//     lastName: "Hassan",
//     password: "Zeeshan@125",
//   });

//   await user.save();
//   res.send("working");
// });
