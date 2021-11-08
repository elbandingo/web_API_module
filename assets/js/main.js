//create a variable for selecting the save task button on the form, and also a taskID counter
var taskIdCounter = 0;
var formE1 = document.querySelector("#save-task"); //creating element to call based on HTML ID
var tasksToDoE1 = document.querySelector("#tasks-to-do"); //creating element to call based on HTML ID
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//create an array for the tasks, used for localStorage
var tasks = [];

var taskFormHandler = function(event) { //function created to add the item when button is clicked
    //prevent the page from reloading everytime
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value; //obtain the value that the user types into the box
    var taskTypeInput = document.querySelector("select[name='task-type']").value; //obtain the selection from the dropdown menu
    //check to see if the values in the boxes are falsy or empty
    if(!taskNameInput || !taskTypeInput) {
        alert("you need to fill out both fields in the task form!");
        return false;
    }

    //clear out the form for when button is clicked/added
    document.querySelector("#task-form").reset();

    //set the parameters for when editing is now occurring
    var isEdit = formE1.hasAttribute("data-task-id");
    //if it has a data attribute, then we are editing
    if(isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //if there is no data attribute, we want the form to be treated as a new entry
    else {
    //assuming there is data, pack it up into an object for use now, and future use
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };

    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
    }

};

var createTaskE1 = function(taskDataObj) {
    var listItemE1 = document.createElement("li"); //create an LI when the item gets added
    listItemE1.className = "task-item"; //adds a style class to make it easier to style

    //create a div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");

    //add a task ID as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    //give the Div a class name
    taskInfoE1.className = "task-info";
    //add the HTML content to the DIV
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemE1.appendChild(taskInfoE1);
    listItemE1.appendChild(taskActionsEl);
    tasksToDoE1.appendChild(listItemE1);

    //set the taskDataObject id to equal the current counter of the task ID
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    console.log(tasks);

    //increase the task counter, so the next time something is added, a new unique value is assigned
    taskIdCounter++;

    //testing to see if the console can capture current object state
    console.log(taskDataObj);
    console.log(taskDataObj.status);

    //call localStorage function to load items from storage
    saveTasks();

}

//function declaration for creating the edit/delete/dropdowns and buttons for each task added
var createTaskActions = function(taskId) {
    //create a DIV to contain these buttons in, give it a class
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create the edit button, give it a class, and assign a unique data-task ID
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create the Delete button, give it a class, and assign a unique DATA-TASK ID
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create a select dropdown menu to toggle which category this is being moved to
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    //create an array of options, and loop through them when creating "options", for the select element
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create the option element first
        var statusOptionEl = document.createElement("option");
        //set the content of the text to equal the current array value
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append the item to the select element
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

}

//method for recognizing the user clicking ADD TASK
formE1.addEventListener("click", taskFormHandler);


var taskButtonHandler = function(event) {
    //get hte target element from Event
    var targetEl = event.target;

    if(targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

    else if(targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }


};

//function created to remove a task, when delete button is clicked. this selects the specific data task assigned in the loop
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    taskSelected.remove();

    //create a new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop throug the current tasks
    for (var i = 0; i < tasks.length; i++) {
        //if the current index does not match the value of task ID, lets keep that task
        if(tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //re-assign the tasks array to be the same as the updatedTaskArr
    tasks = updatedTaskArr;

    //add localstorage function
    saveTasks();
};

//function created to edit a task. it will send the contents back up to top of the form, and then change wording to SAVE task on the button
var editTask = function(taskId) {
    console.log("editing task #" + taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    //get the content from the task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //send the information back to the form at the top of the screen when edit is picked
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formE1.setAttribute("data-task-id", taskId);

};

//function to move the task to the appropriate column, based on your select decision
var taskStatusChangeHandler = function(event) {
    //get the task Item Id
    var taskId = event.target.getAttribute("data-task-id");

    //get the current selection options value, convert it to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the ID
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //move the items to the child UL element in the appropriate column
    if (statusValue === "to do") {
        tasksToDoE1.appendChild(taskSelected);
    }
    else if(statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    //update the tasks in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
            
        }
    }
    console.log(tasks);
    //add localstorage function
    saveTasks();
};


//function to finish editing a task. This will select the ID you are working on, update it, then clear the form and start new
var completeEditTask = function(taskName, taskType, taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //for loop to update the array of tasks object, and update its content
    for(var i = 0; i < tasks.length; i++) {
        if (tasks[i] === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    //add local storage function
    saveTasks()

    alert("Tasks Updated!");
    //clear the current ID, and then reset the button text to add task
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

}
//method for recognizing the Delete and Edit buttons on click
pageContentEl.addEventListener("click", taskButtonHandler);

//method for changing the category of the task, to move it elsewhere
pageContentEl.addEventListener("change", taskStatusChangeHandler);

//local storage method to keep persistence with data when refreshing

var saveTasks = function() {
    localStorage.setItem("tasks", tasks);
}