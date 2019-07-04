var express = require('express');
var router = express.Router();
var db = require('../models');

var helpers = require('../helpers/todos');

router.route('/') // refactor the routers using helper functions and .route() method + callbacks
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router; // We need to expose the defined router variable (i.e. express.Router()) so that the root index.js
                        // can use this router
