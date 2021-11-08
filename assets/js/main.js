//create a variable for selecting the save task button on the form
var formE1 = document.querySelector("#save-task"); //creating element to call based on HTML ID
var tasksToDoE1 = document.querySelector("#tasks-to-do"); //creating element to call based on HTML ID
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
    //assuming there is data, pack it up into an object for use now, and future use
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);

};

var createTaskE1 = function(taskDataObj) {
    var listItemE1 = document.createElement("li"); //create an LI when the item gets added
    listItemE1.className = "task-item"; //adds a style class to make it easier to style

    //create a div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    //give the Div a class name
    taskInfoE1.className = "task-info";
    //add the HTML content to the DIV
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemE1.appendChild(taskInfoE1);
    tasksToDoE1.appendChild(listItemE1);
}


formE1.addEventListener("click", taskFormHandler)