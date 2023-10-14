const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { projectRouter } = require("./Routes/project.routes.js");
const { taskRouter } = require("./Routes/task.route.js");
const { router } = require("./Routes/user.routes.js");
const { teamroutes } = require("./Routes/team.routes.js");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req,res) => {
  res.send("Welcome to home !")
})
app.use("/user", router);
app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/team", teamroutes);

app.listen(3232, () => {
  connect();
  console.log("server running on 9696");
});
