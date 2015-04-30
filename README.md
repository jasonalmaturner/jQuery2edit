#Listo with jQuery

Using jQuery, we will be turning our HTML / CSS assessment into a real life web application named Listo!

With Listo, users will be able to:

*Create new list items.
*Move the items from 'New' to 'In Progress', then to 'Archived', and then delete the item.
*Save list items to our browser's local storage so that it persists, even if we close the browser.

#Step 1
###Our Environment

We are going to be setting up the environment from scratch so that we can get used to building our projects.

First, fork and clone this repo, so that we can access this README during our development. For the sake of simplicity, the index.html file has already been created. So, no need to change it yet.

After that, create a folder called 'app'. This is where the guts of the app will be stored. Inside the app folder, make a folder called 'scripts'. This is where the JavaScript files will be stored.

Create the main JavaScript file inside the scripts folder, and name it something awesome like 'app.js'.

Inside the app folder, create a folder called 'Styles'. This is where the CSS files will be stored. Inside the 'Styles' folder, make a file called main.css.

Now that all the basic files have been created, they all need to be hooked together in the index.html file.

*Remember: a lot of times we get errors in the beginning of a project is because the files are not properly linked.*

*Remember: your browser will read your index.html from top-to-bottom, left-to-right. This means if you put your jQuery under your app.js file you will end up with an error.*


#Step 2
###Time For jQuery

Now that the environment is set up and markup written, it's time to get into the JavaScript with jQuery.

The first thing to do is go into the app.js file and create the document ready function:

*app.js*

	$(document).ready(function() {//ALL CODE GOES IN HERE});

This essentially allows the app to load when the document loads. It's a weird jQuery thing. Remember, all of the code in the app.js will go within the {} of the above function.

###Basic Architecture

We are going to be creating a todo list. So, the easiest way to store a list of things is to create an array!

*app.js*

	var listo = [];

Listo will be the main array for storing tasks.

We don't want the listo array to just store strings. We need to store both the task string that the user will input, and the status of the task. So, the listo array will store task objects, and each object will have two keys. Since the users are going to be creating a lot of tasks, the process can be streamlined by creating objects with a **constructor**!

<!-- Now, we don't want to just store strings. So instead we will store Task objects into our array. Because our users are going to be making a lot of Tasks we should perhaps streamline the object creating process with a **constructor**! -->

*app.js*

	var Task = function(task) {
		this.task = task;
		this.id = 'new';
	}


Now there is an array to push tasks onto, and a task constructor so the users can create object tasks for their lists.

The next thing needed is the ability for a user to input a todo task into our index.html and save it to the array.

Go to index.html and create a space for users to type in list items.

*index.html*

	    <form id="newTaskForm">
	    	<label>New Item</label>
	        <input id="newItemInput" placeholder="new task">
	        <button id="saveNewItem">Save</button>
	        <button id="cancel">Cancel</button>
   	    </form>

This will create a form with a save and cancel button. The save and cancel buttons and the form are given ids so that they can be called with jQuery.

<!-- You will come to see that most elements in our html will have an ID. That is so that jQuery has a lot of hooks to make contact with what it is looking to manipulate. -->

When using jQuery, most elements in HTML will have an ID. This provides hooks to specific HTML elements for jQuery to grab and manipulate.

###Making our addTask function

When the user enters something into the input field and clicks the save button, an objected should be created and that object pushed to the array.

This can be done by making a function.

*app.js*

	var addTask = function(task) {};

Cool, a blank function named 'addTask'!

Now, it wouldn't be good for users to be able to create blank todo tasks. That would be a little frustrating. So, make sure the function has a condition that only runs if the user enters a task into the input.

*app.js*

	var addTask = function(task) {
		if(task) {

		}
	};

The code will only run if 'task' is truthy. Empty tasks are not truthy, since they're just empty strings.

Next, create a new task with the task constructor, passing it the 'task', and then pushing the new task to the listo array.

<!-- Next we want to call our task constructor and fill it with the new task, then we will push the new task to listo, and save it. -->

*app.js*

	var addTask = function(task) {
		if(task) {
			var newTask = new Task(task);
			listo.push(newTask);
		}
	};


There are a couple of things that could be added to this function to make it work correctly and improve the user experience. It would be convenient to have the input form clear after submitting. And, the new list item needs to show up on the view in the index.html.

<!-- Now there are a few things we should add to this function to make it work correctly. First we want the input form to clear after we submit it, which currently isn't happening. Then we want to make it so we can show our new list item in our index.html. -->

*app.js*

	var addTask = function(task) {
		if(task) {
			var newTask = new Task(task);
			listo.push(newTask);

			$('#newItemInput').val(''); /*This will replace whatever string is in the input box with an empty string*/
			$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + newTask.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>'); /*This will add the new list item to the view.*/

		}
	};

Next, create a way to toggle the form to see how jQuery affects the app's design.

The newTaskForm should be hidden when the document initially loads. So, place the code that hides the newTaskForm near the top of the app.js file so that it loads correctly.

<!-- First we should make it so that our newTaskForm is hidden when the document loads. Let's put this near the top of our document so that it loads correctly. -->

*app.js*

	$('#newTaskForm').hide();

Then, add the fade toggle so that the New button will hide and show the input form at the same time.

*app.js*

	var addTask = function(task) {
		if(task) {
			task = new Task(task);
			listo.push(task);

			$('#newItemInput').val('');

			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

		}
		$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');

	};

We added a new ID here called newListItem. We will need to attach that to a button in the index.html file so that we can toggle the form.

*index.html*

	<div class='new-item-header'>
		<button href="#" class="pull-right pencil" id="newListItem" style="">New</button>
	</div>

Let's also create a div underneath all of that with the id of newList so that our addTask function can append the new items into the DOM.

*index.html*

	<div id="newList">
		New List
	</div>


We will now call a jQuery event that calls the addTask function when we click the saveNewItem button.

*app.js*

    $('#saveNewItem').on('click', function (e) {
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);
    });

Finally let's make it so that we can open and close the new task form with the newListItem and Cancel button.

*app.js*

	//Opens form
    $('#newListItem').on('click', function () {
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });
    //closes form
    $('#cancel').on('click', function (e) {
        e.preventDefault();
        $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
    });


#Step 3 Task Progression HTML
###Scaffold the lists

Before we make it possible to move our tasks from in progress to archived, we want create a space for them to exist in our HTML. We will do this in a very minimalist way in order to get things in a way they make sense.

All we really need to do is create divs with ULs within them that contain the IDs our jQuery will look for. Or in other words, let's make some hooks for our jQuery to find and manipulate!

Underneath our existing HTML in our index.html we should do this:

*index.html*

	<div class="panel">
            In Progress
            <ul class="list-group" id="currentList"></ul>
    </div>

    <div class="panel">
            Archived
            <ul class="list-group" id="archivedList"></ul>
    </div>


Let's also go into our CSS file and create a panel  class

*main.css*

	.panel {
		display: inline-block;
		width: 33%;
	}



#Step 4 Task Progression jQuery
###Starting, Finishing, and Deleting Tasks

The next thing we want is to create a way for our tasks to be moved from **new**, to **in progress**, to **archived**, and eventually deleted.

If you remember, when we created our task constructor we took in the parameter for task, and we also created an ID that was automatically set to 'new'. In order to transition a task from 'new' to 'inProgress' all we really need to do is update the object's ID so that it says 'inProgress'.

First let's make a function that allows us to change the status of an item from 'new' to 'inProgress'.

*app.js*

	$(document).on('click', '#item', function(e) {
		e.preventDefault();

	});

From the beginning this function looks a little different than our other functions. For one, we call the *document* as the hook. Why are we doing that?

Remember, with jQuery the DOM doesn't really do anything. It's just there. That means all of the heavy lifting happens in jQuery. For this, and the next couple of functions, we will need to call the document so that as we create and manipulate html elements, the DOM realizes that they're there.

Another weird thing is e.preventDefault(); All this is saying is that we are removing the default properties of whatever HTML element we are clicking on. If we want an anchor tag so we can click on list items, but we don't want all of the baggage that comes with an anchor tag (like refreshing the page, or trying to take us to a new page) then this line of code will allow us to do that.

**It's similar to when we use normalize.css to remove default HTML styles.**

The last weird thing is that we are listing '#item' near our 'click' event. This is just so we can specify what we are affecting when we click.

Now let's set a variable called task so that we can access the 'this' keyword to pass it into another function.

We are also going to change it's ID to the string 'inProgress'.

*app.js*

	$(document).on('click', '#item', function(e) {
		e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
	});


The last thing this function needs is the ability to move the actual list item. We do that by pulling all of the html around the item itself.

*app.js*

	$(document).on('click', '#item', function(e) {
		e.preventDefault();
        var task = this;
        advanceTask(task);
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);

	});


We can also move the items from 'inProgress' to 'archived' with a similar function:

*app.js*

    $(document).on('click', '#inProgress', function (e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    });



Finally, in a similar fashion we want to create a way to delete the items on the list. All we have to do is pass a task into the advanceTask function without a new id. You can study the advanceTask function we built to understand how it works!

*app.js*

    $(document).on('click', '#archived', function (e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });





*A note on archiving*
A lot of times when writing software we don't necessarily want to delete things all out. Sometimes a user will accidently delete something, and if we are actually obliterating things. Doing what is called a soft delete is often a good thing to do.

Think of our archived ID like a soft delete. We could make it disappear to the user, but if there is a case where they made a mistake it's still accessible.

Perhaps it's not so important with a todolist, but it's good to start thinking about.


# Black Diamond: Local Storage
###Our Browsers Brain

The final step for the todo list is to save our list items on local storage. Local storage allows our app to access the browsers built in storage. We can save a limited amount of data in cool ways. This means if we close our browser our list items will still be there!

Here are some resources:

http://diveintohtml5.info/storage.html

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Good luck!
