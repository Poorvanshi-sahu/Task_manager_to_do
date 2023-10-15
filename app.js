const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("../starter/public"));

// routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port} and database connected.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
