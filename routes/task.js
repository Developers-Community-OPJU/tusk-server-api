const express = require('express');
const { date } = require('joi');
const router = express.Router();
const { Task, validateTask } = require('../models/TaskModel');

// TEST ROUTE
router.get('/', async (req, res) => {
    var ID = "DTASKID" + new Date().getFullYear() + new Date().getDate() + new Date().getTime();
    res.status(200).json({
        msg: "Task API Tester",
        ID,
    })
});

// CREATING TASK
router.post('/push', async (req, res) => {
    try {
        // validating task
        const { error } = validateTask(req.body);
        if (error) return res.status(400).json({
            msg: "Validation Falied",
            error: error.details[0].message
        });
        // PARSING REQ DATA 
        let newTask = {
            heading: req.body.heading,
            description: req.body.description,
            assignedBy: req.body.assignedBy,
            assignedTo: req.body.assignedTo,
            milestones: req.body.milestones,
        };
        let task = new Task(newTask);
        // SAVING THE DOCUMENT
        let result = await task.save();
        res.json({
            msg: "Task Assigned Successfully!",
            task: result,
        });

    } catch (error) {
        res.send(error);
    }
});

// DELETING TASK
router.delete('/pull/:id', async (req, res) => {
    try {
        await Task.deleteOne({ "_id": req.params.id });
        res.status(200).json({
            msg: "Task Removed Succesfully!",
        })
    } catch (error) {
        res.send(error)
    }
});

router.get("/find/:id", async (req, res) => {
    try {
      const task = await Task
        .findOne({ "_id": req.params.id });
  
      if (!task) {
        res.status(500).json({
          msg: "Sorry No such task exists..",
          suggestion: "Try to search another task ",
        });
      }
      res.status(200).json({
        msg: "Task",
        task,
      });
    } catch (error) {
      res.send(error);
    }
  });

// UPDATING TASK
router.put("/update/:id", async (req, res) => {
    try {
        const { error } = validateTask(req.body);
        if (error) return res.status(400).json({
            msg: "Validation Falied",
            error: error.details[0].message
        });
        let task = await Task.findOneAndUpdate({ "_id": req.params.id }, req.body);
        if (!task) {
            res.status(500).json({
                msg: "No Such Task Found!",
                suggestion: "Try to Update Again..",
            });
        }
        else {
            res.status(200).json({
                msg: "Task Updated Successfully!",
            });
        }
    } catch (error) {
        res.send(error);
    }
});

// ADD NEW MILESTONE

module.exports = router;

