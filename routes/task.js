const express = require('express');
const { date } = require('joi');
const { toPlainObject } = require('lodash');
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
    try {``
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
            dueDate : req.body.dueDate
        };

        // console.log(newTask)

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

// LIST ALL TASKS
router.get("/find/all", async (req, res) => {
    try {
      const tasks = await Task.find({});       
      res.status(200).json({
        msg: "Task Listing",
        tasks,
      });
    } catch (error) {
      res.send(error);
    }
  });

// FINDING PARTICULAR TASK
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


// ACCEPT TASK
router.get('/accept/:id', async (req,res)=>{
  try {
    let task = await Task.findOne({_id:req.params.id})
    if(!task) return res.json({msg : "NO Such Task Exists."});    
    task.status = "Accepted";
    task.save();
    res.json({
      msg : "Task Accepted!",
      task
    })

  } catch (error) {
      res.send(error)
  }
});


//========================================================
// MILESTONES ROUTES
// =======================================================

// ADD NEW MILESTONE
router.put('/milestone/add/:id', async (req,res)=>{
  if(!req.body) return res.json({msg : "Something went wrong!"})
  const milestone = req.body;
  try {
    let task = await Task.update({_id: req.params.id},{
      $push :{
        milestones : milestone
      }
    })
    res.json({
        msg : "Milestone Added Successfully"        
    });

  } catch (error) {
      res.send(error)
  }
});


//========================================================
// SEARCHING AND FILTERING ROUTES
// =======================================================

// ADVANCED SEARCH QUERIES 
// USING THE QUERY PARAMETER
router.get('/search', async (req,res)=>{
  try {
    const query = req.query;
    console.log(query)
    let task = await Task.find(query)
    if(!task) return res.json({msg : "Couldn't Find the Tasks.. Try Again"}); 
    res.json({
      msg : "Tasks Found",
      task
    })
  } catch (error) {
      res.send(error)
  }
});

module.exports = router;

