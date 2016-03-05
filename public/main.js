'use strict';


$(document).ready(init);


function init() {

getallTasks();

$('#addTask').click(addNewTask);


}

function getallTasks() {

	$.ajax({
		url: '/todos',
		method: 'GET',
		success: function(todos) {
			// console.log(todos);

			var $todos = todos.map(function(todo) {
				
				//console.log(todo);
				// todo = JSON.parse(todo);
				var $todo = $('#template').clone();
				$todo.removeAttr('id');
				$todo.find('.desc').text(todo.desc);
				$todo.find('.dueDate').text(todo.dueDate);
				$todo.find('input').prop(todo.isComplete);

				if(todo.isComplete === "true") {
					$todo.find('input').prop('checked', todo.isComplete);
				}

				return $todo;
			});

			$('#list').append($todos);

		},

		error: function(err) {
			console.log(err);
		}
	})

}

function addNewTask() {

	var task = $('#newTask').val();
	var date = $('#dueDate').val();
	var complete = false;

	var newToDo = {
	"desc": task,
	"dueDate": date,
	"isComplete": "false"
	};
	
	console.log(newToDo);

	$.ajax({
		url: '/add',
		method: 'POST',
		data: newToDo,
		success: function(data) {
			console.log('successful post', data);

			$('#list').empty();


			var $todos = data.map(function(todo) {


			var $todo = $('#template').clone();
			$todo.removeAttr('id');
			$todo.find('.desc').text(todo.desc);
			$todo.find('.dueDate').text(todo.dueDate);
			$todo.find('input').prop('checked', todo.isComplete);

			return $todo;
	
		    });

		    $('#list').append($todos);
		    $('#newTask').val('');
		    $('#dueDate').val('');



		},

		error: function(err) {
			console.log(err);
		}
	})



}





