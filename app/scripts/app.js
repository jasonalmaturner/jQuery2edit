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
    task = new Task(task);
    listo.push(task);

    $('#newItemInput').val('');
    $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
  }
}

});
