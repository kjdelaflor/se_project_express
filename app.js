const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();
const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").then(
  () => {
    console.log("Connected to DB");
  },
  (e) => console.log("DB erorr", e)
);

const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
  console.log("This is finally working!");
});
