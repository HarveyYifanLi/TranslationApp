/* global $ */
$(document).ready(function(){
    // first ajax get request to populate the page with the data after page finish loading
    $.get('/api/todos')
    .then(addTodos);
    
    $( "#dataQueryForm" ).on("submit", function(event) {
        event.preventDefault(); // this will prevent the default action specified in the <form> attributes i.e. the get request to some url
        console.log($(this).serialize()); // this is how we access the query string submitted from a <input> element
        // example qurey url is: /api/todos?search=buy
        var url = '/api/todos?' + $( this ).serialize(); // we need to encode the query string in the url 
        // for the ajax request
        $.get(url)
        .then(clearTodos) // Pay attenetion to the usage of this promise!!!
        .then(addTodos);
    });
        
    //  $('#queryInput').keypress(function(event){
    //     if(event.which == 13){
    //         var url = '/api/todos?' + $( this ).serialize();
    //         $.get('/api/todos')
    //         .then(addTodos);
    //     }
    // });
    
    $("#lanForm").on("submit", function(event){
        event.preventDefault();
        //console.log($(this).serialize());
        console.log($("#lanDropdown").val()); // select the actual value of the selected option: e.g. zh
        console.log($("option").attr("name")); // select the "name" attribute of the option element i.e. lanSelection
        alert("The target language to be translated to is set to: " + $("#lanDropdown :selected").text());
        //Also note on how to get the selected option's text !!! i.e. Chinese 
        
        var url ="/api/todos?" + $("option").attr("name") + "=" +$("#lanDropdown").val();
        $.get(url); // Exactly the same as normal form submission through "sending a get request with query string"
    });
  
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    });
    
    $('.list').on('click', 'span', function(event){
        event.stopPropagation(); // make sure this click event on this span element
        // does not bubble up to parent elements (i.e. list, ul, body etc)
        // $(this) = the span 
        // $(this).parent() = the li element
        removeTodo($(this).parent());
    });
    
});

function clearTodos(data){
    $('.list').empty();
    return data; // the argument 'data' and the return of this argument is absolutely necessary 
    // in order to return a promise such that the following .then() method 
    // still has the data (i.e. input argument) to act upon
}

function addTodos(todosData){
    todosData.forEach(function(todoItem){
        console.log(todoItem); // thus each element in the array is a js object
        addTodo(todoItem);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
    
    newTodo.data('idOfLI', todo._id); // IMPORTANT! Use this jQuery method (.data) to save the id of the record in the db
    //into an attibute (i.e. 'idOfLI') of the UI element (i.e. the created li element)
    newTodo.data('completed', todo.completed);
    
    if(todo.completed){
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodoData){
        addTodo(newTodoData); // add the new data onto the page
        $('#todoInput').val(''); // clear the input field
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todoLI){
    var liID = todoLI.data('idOfLI');
    var deleteUrl = '/api/todos/' + liID;
    
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todoLI.remove(); // following a successful removal of db record, we then remove the actual li from the page, otherwise needs a page refresh to show the change
    })
    .catch(function(err){
        console.log(err);
    });
}

function updateTodo(todoLI) {
    var updateUrl = '/api/todos/' + todoLI.data('idOfLI');
    var isCompletedDataOnBrowser = todoLI.data('completed');
    var updateData = {completed: !isCompletedDataOnBrowser}
    
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    }) // ajax method only updated the data in the DB, we need below to
       // update (keep in sync) the corresponding data in the browser as well 
    .then(function(updatedTodo){
        todoLI.data('completed', !isCompletedDataOnBrowser);
        // firstly need to update the completed data on browser as well
        todoLI.toggleClass('done');
        // then need to toggle the css class for the list element
    })
    .catch(function(err){
        console.log(err);
    });
    
}
