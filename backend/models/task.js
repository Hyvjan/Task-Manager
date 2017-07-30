var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	taskName: {type:String, required:true},
	taskDescription: {type:String, required:true},
	created: {type:Date, required: true},
	domain: {type:String},
	whosResponsibility: {type:String},
	duedate: {type:Date},
	status: {type: Number},
	hoursUsed: {type:Number},
	finished: {type:Date}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Task', schema);