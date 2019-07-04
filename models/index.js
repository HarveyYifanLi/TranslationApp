var mongoose = require('mongoose');
var TodoModuleImported = require('./todo');

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/todo-api');
// Important!!!: todo-api will thus be connected to (or created) as a new db in the mongoDB database

// Extra note, to stop a mongod demon that is already started, use command: sudo service mongod stop

// find a record using a property, e.g.
// db.todos.find({_id: ObjectId("5ceaefcea44ee3a09e39758d")})
// Additionally, in the mongo shell, to manually create it, we can type "use todo-api" and then manually insert records to the todos collection
// by typing: 
// "db.todos.insert({ name: "Buy some stuff"})"
// we can also check all collections in a specific db (such as todo-api) by typing: 
// "show collections"
// To find a specific record and update a specific field use command:
//e.g:
// db.todos.findOneAndUpdate({name: "Buy some stuff"}, {$set: {completed: true}})
// db.todos.findOneAndUpdate({_id: ObjectId("5cf85a33b006777a9e3746e2")}, {$set: {completed: true}})

mongoose.Promise = Promise;

module.exports.Todo = TodoModuleImported;
//module.exports.Todo = require('./todo'); // this is a combined version of two lines 

// i.e. We need to expose the imported local module (i.e. TodoModuleImported) as a variable/property Todo in the global scope (i.e. global object)
// (so that we can access/use this new data collection as db.Todo.find() etc in the routers),

