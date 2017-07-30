var express = require('express');
var router = express.Router();

var Task = require('../models/task');
var User = require('../models/user');

/*Post message*/
router.post('/task', function (req, res, next) {
	var task = new Task({
		taskName: req.body.taskName,
		taskDescription: req.body.taskDescription,
		created: req.body.created,
		domain: req.body.domain,
		whosResponsibility: req.body.whosResponsibility,
		duedate: req.body.duedate,
		status: req.body.status,
		hoursUsed: req.body.status,
		finished: req.body.finished
	});
	task.save(function(err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(201).json({
			message:'Saved task',
			obj: result
		});
	});
});

/*Patch task*/
router.patch('/task:id', function (req, res, next) {
	Task.findById(req.params.id, function(err, task) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!task) {
			return res.status(500).json({
				title: 'No task found',
				error: {message: 'Task not found'}
			});
		}
		task.taskName = req.body.taskName;
		task.taskDescription = req.body.taskDescription;
		task.created = req.body.created;
		task.domain = req.body.domain;
		task.whosResponsibility = req.body.whosResponsibility;
		task.duedate = req.body.duedate;
		task.status = req.body.status;
		task.hoursUsed = req.body.hoursUsed;
		task.finished = req.body.finished;
		task.save(function(err, result) {
			if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(200).json({
			message:'Saved edited task',
			obj: result
		});
		});
	});
});



/*Get messages */
router.get('/task', function(req, res, next) {
	Task.find()
		.exec(function(err, tasks) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			};
			res.status(200).json({
				message: 'Messages returned successfully',
				obj: tasks
				});
		});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
