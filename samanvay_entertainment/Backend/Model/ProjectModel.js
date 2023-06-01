const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = { ProjectModel };
