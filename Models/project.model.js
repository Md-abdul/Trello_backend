const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectId: Number,
    name: String,
    description: String,
    startDate: String,
    endDate: String,
    projectManager: String
})

const ProjectModel = mongoose.model('project', projectSchema)

module.exports = {ProjectModel};