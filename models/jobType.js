var mongoose = require("mongoose");
var User = require("./job");

var jobTypeSchema = new mongoose.Schema({
  jobTypeName: {type: String, unique: true},
  userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
  }],
  jobId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
  }],
  createdAt: {type: Date, default: Date.now}
});

var JobType = mongoose.model('JobType', jobTypeSchema);
module.exports = JobType;