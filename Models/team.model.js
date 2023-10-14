const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  teamID: Number,
  teamName: String,
});

const TeamModel = mongoose.model("team", teamSchema);
module.exports =  {TeamModel} ;