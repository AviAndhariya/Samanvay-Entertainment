const express = require("express");
const { ProjectModel} = require('../Model/ProjectModel')

const ProjectRouter = express.Router();

// POST

ProjectRouter.post("/post", async (req, res) => {
  const data = req.body;
  try {
    const addProject = new ProjectModel(data);
    await addProject.save();
    res.status(200).send("project adding success");
  } catch (err) {
    res.status(400).send("project adding failed");
    console.log(err);
  }
});

// GET with filter
ProjectRouter.get("/", async (req, res) => {
    try {
      const filter = req.query.filter; 
        console.log(filter)
      let projects;
      if (filter) {
        projects = await ProjectModel.find({ "category" : filter }); 
      } else {
        projects = await ProjectModel.find();
      }
      res.status(200).send(projects);
    } catch (err) {
      res.status(400).send("Error fetching projects");
      console.log(err);
    }
  });

//   Update
ProjectRouter.put("/:projectId", async (req, res) => {
    const projectId = req.params.projectId;
    const newData = req.body;
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, newData, { new: true });
      if (!updatedProject) {
        return res.status(404).send("Project not found");
      }
      res.status(200).send(updatedProject);
    } catch (err) {
      res.status(500).send("Error updating project");
      console.log(err);
    }
  });
  

//   Delete

ProjectRouter.delete("/:projectId", async (req, res) => {
    const projectId = req.params.projectId;
    try {
      const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
      if (!deletedProject) {
        return res.status(404).send("Project not found");
      }
      res.status(200).send("Project deleted successfully");
    } catch (err) {
      res.status(500).send("Error deleting project");
      console.log(err);
    }
  });

//   Search
ProjectRouter.get("/search", async (req, res) => {
    const searchTerm = req.query.term;
    try {
      const searchResults = await ProjectModel.find({
        name: { $regex: searchTerm, $options: "i" },
      });
      res.status(200).send(searchResults);
    } catch (err) {
      res.status(500).send("Error searching projects");
      console.log(err);
    }
  });
  

  

module.exports = { ProjectRouter }