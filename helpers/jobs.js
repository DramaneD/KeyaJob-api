var db    = require("../models");

exports.createJob = function(req, res) {
  db.User.findById(req.params.id).then(function(user) {
    const newJob = {
      title: req.body.title,
      description: req.body.description,
      author: {
        id: user.id,
        userName: user.userName
      },
      applicationLink: req.body.applicationLink,
      compagnyId: req.body.compagnyId,
      categoryId: req.body.categoryId,
      jobTypeId: req.body.jobTypeId,
      tagId: req.body.tagId
    }

    db.Job.create(newJob).then(function(job) {
      db.User.findById(req.params.id).then(function(user) {
        user.jobs.push(job._id)
        user.save().then(function(user) {
                return db.Job.findById(job._id)
                    .populate("userId", { username: true })
            }).then(function(j) {
                return res.status(200).json(j);
            }).catch(function(err) {
              res.send(err)
              });
      }).catch(function(err) {
            res.send(err)
        })
    }).catch(function(err) {
        res.send(err)
    })

  }).catch(function(err) {
    res.send(err)
  })
}

exports.getAllJobs = function(req, res) {
  db.Job.find().sort({ createdAt: 'desc' })
    .populate("userId", {userName: true}).then(function(jobs) {
    res.status(200).json(jobs);
  }).catch(function(err) {
    res.status(500).json(err);
  })
}

exports.getSingleJob = function(req, res) {
  db.Job.find({_id: req.params.jobId}).sort({ createdAt: 'desc' })
    .populate("userId", {userName: true}).then(function(job) {
    res.status(200).json(job);
  }).catch(function(err) {
    res.status(500).json(err);
  })
}

exports.updateJob = function(req, res) {
  db.Job.findByIdAndUpdate({_id: req.params.jobId}, req.body, {new: true}).then(function(job) {
    res.json(job);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteJob = function(req, res) {
  db.Job.remove({_id: req.params.jobId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;