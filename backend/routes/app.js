var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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


/*Post user*/
router.post('/user', function (req, res, next) {
	var user = new User({
		firstName: req.body.firstName,
		lastName: req.body.firstName,
		email: req.body.email,
		teamMember: req.body.email,
		teamLeader: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10)
	});
	user.save(function (err, result) {
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(201).json({
			message: 'User created',
			obj: result
		});
	});

});

/*POst rout for signing in*/
router.post('/login', function (req, res, next) {
	User.findOne({email: req.body.email}, function(err, user){
		if (err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!user) {
			return res.status(401).json({
				title: 'Login failed',
				error: {message: 'Invalid user credentials'}
			});
		}
		if (!bcrypt.compareSync(req.body.password, user.password)) {
			return res.status(401).json({
				title: 'Login failed',
				error: {message: 'Invalid user credentials'}
			});
		}
		var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			message: 'Succesfully logged in',
			token: token,
			userId: user._id
		});
	});

});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
