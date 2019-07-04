var db = require('../models');

const projectId = "vocabularypad";
  // Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');
  // Instantiates a translate client
const translate = new Translate({projectId});
 // The target language is Chinese
var targetLanguage = 'zh'; // default the target language to Chinese

let translation;

//critical note, 'exports' is a reserved global object, thus we are essencially attaching 
// below properties (i.e. functions) to the 'exports' object:

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

//  route /api/todos
exports.getTodos = function(req, res){
    if(req.query.search) {  // note on how the "search" variable in the query string (from ajax get request) is captured here
        
        console.log("The query string entered is: " + req.query.search);
        
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        
        db.Todo.find({name: regex})
        .then(function(todos){
            if(todos.length !== 0){
                //console.log(todos.length);
                res.json(todos); 
            } else {
                res.send("<div style=\"text-align:center\"><h2>There are no match to the query provided...please try another query string</h2><p>The query string entered is: " + req.query.search + "</p></div>");
            }
        })
        .catch(function(err){
            res.send(err);
        });
        
    } else if (req.query.lanSelection){ // note on how the "lanSelection" variable in the query string (from ajax get request) is captured here
        
        console.log("The target language selected is: " + req.query.lanSelection);
        targetLanguage = req.query.lanSelection; // then we set the target language using the value from the query string
        
    } else {
        db.Todo.find()
        .then(function(todos){
            res.json(todos);        
        })
        .catch(function(err){
            res.send(err);
        });
    }
}

// async function googleTranslate(input){
//   // Note that translate.translate() returns a promise and thus needs to be resolved and handle rejection as well
//   translate
//   .translate(input, target)
//   .then(results => {
//     translation = results[0];
//     console.log(`Text: ${input}`);
//     // console.log(typeof(translation)); // return a string
//     console.log(`Translation: ${translation}`);
//     //return translation;
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// }
// // Below does not work! The DB operation has to be a callback after the translation api operation is completed!!!
// exports.createTodo = function(req, res){
//     console.log(req.body);
//     let text = req.body.name;
//     googleTranslate(text).then(function(){
//         req.body = {name: text + ": "+ translation};
//         console.log(req.body);

//         db.Todo.create(req.body)
//         .then(function(newTodo){
//             res.json(newTodo);
//         })
//         .catch(function(err){
//             res.send(err);
//         })
//     });
// }

// Note below: We need to handle database operation insertion as a callback after the translation operation is resolved!!!
exports.createTodo = function(req, res){
    //console.log(req.body);
    let text = req.body.name;
// Note that translate.translate() returns a promise and thus needs to be resolved and handle rejection as well
    translate
    .translate(text, targetLanguage)
    .then(results => {
        translation = results[0];
        console.log(`Text: ${text}`);
        // console.log(typeof(translation)); // return a string
        console.log(`Translation: ${translation}`);
        
        req.body = {name: text + ": "+ translation};
        console.log(req.body);
        //do DB operation after the translation
        db.Todo.create(req.body)
        .then(function(newTodo){
            res.json(newTodo);
        })
        .catch(function(err){
            res.send(err);
        });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

//  route /api/todos/:todoId
exports.getTodo = function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "Successfully deleted an item!..."});
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;