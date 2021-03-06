var db    = require('../models');

exports.createCategory = function(req, res, next) {
  const newCategory = {
    categoryName: req.body.categoryName,
    userId: req.params.id
  };

  db.Category.create(newCategory).then(function(category) {
  db.User.findById(req.params.id).then(function(user) {
    user.categories.push(category.id)
    user.save().then(function(user) {
      return db.Category.findById(categories._id)
      .populate("userId", {userName: true})
    }).then(function(c) {
      return res.status(200).json(c);
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

exports.updateCategory = function(req, res, next) {
  db.Category.findByIdAndUpdate({_id: req.params.categoryId}, req.body, {new: true}).then(function(category) {
    res.json(category);
  }).catch(function(err) {
    res.send(err);
  })
}

exports.deleteCategory = function(req, res, next) {
  db.Category.remove({_id: req.params.categoryId}).then(function() {
    res.json({msg: "We deleted it!"});
  }).catch(function(err) {
    res.json(err);
  })
}

module.exports = exports;