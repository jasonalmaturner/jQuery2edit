$(document).ready(function(){

$('#newTaskForm').hide();

var listo = [];

function Task (task) {
  this.task = task;
  this.id = 'new';
}

function addTask (task) {
  console.log(task)
  if(task){
    var newTask = new Task(task);
    listo.push(newTask);

    $('#newItemInput').val('');
    $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + newTask.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
  }
}


});
