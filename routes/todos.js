var express = require('express');
var router = express.Router();
var db = require('../models');

var helpers = require('../helpers/todos');

// router.get('/', function(req, res){
//     db.Todo.find()
//     .then(function(todos){
//         res.json(todos);        
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.post('/', function(req, res){
//     db.Todo.create(req.body)
//     .then(function(newTodo){
//         res.json(newTodo);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

router.route('/') // refactor the routers using helper functions and .route() method + callbacks
    .get(helpers.getTodos)
    .post(helpers.createTodo);


// router.get('/:todoId', function(req, res){
//     db.Todo.findById(req.params.todoId)
//     .then(function(foundTodo){
//         res.json(foundTodo);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.put('/:todoId', function(req, res){
//     db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
//     .then(function(todo){
//         res.json(todo);
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

// router.delete(':todoId', function(req, res){
//     db.Todo.remove({_id: req.params.todoId})
//     .then(function(){
//         res.json({message: "Successfully deleted an item!..."});
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router; // We need to expose the defined router variable (i.e. express.Router()) so that the root index.js
                        // can use this router
