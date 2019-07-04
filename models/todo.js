var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Wiseman: Name can not be blank!'
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var TodoModule = mongoose.model('Todo', todoSchema); 
// "Model the todoSchema as Todo" - 
// i.e. model/encode whatever new schema for the new data "collection" as Todo (i.e. this will create a brand new 'Todo' 
// collection in the MongoDB)
// i.e. we can create other new collections in the MongoDB by using the same procedure:
//var TodoModule = mongoose.model('NewTodoList', todoSchema); 
//var TodoModule = mongoose.model('TodoStuffList', todoSchema); 
//var TodoModule = mongoose.model('Todo123', todoSchema); 

// and then we export this whole local module (that we created) as TodoModule to the global scope (i.e. global object)
// by using "module.exports = TodoModule"

module.exports = TodoModule;
