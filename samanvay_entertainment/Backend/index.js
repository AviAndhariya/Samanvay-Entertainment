const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const cors = require("cors");
const { ProjectRouter } = require("./Routes/Route");
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/Project",ProjectRouter)
app.use("/project", ProjectRouter);


app.get("/", (req, res) => {
  res.send("your site is working");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`listening on port ${process.env.PORT}`);
  } catch (err) {
    console.log("err");
    console.log("connection to db failed");
  }
});
