var buttonE1 = document.querySelector("#save-task"); //creating element to call based on HTML ID
var tasksToDoE1 = document.querySelector("#tasks-to-do"); //creating element to call based on HTML ID
var createTaskHandler = function() { //function created to add the item when button is clicked
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "this is a new task";
    tasksToDoE1.appendChild(listItemE1); // appends the child elements based on its parent called in the variable at the top
}


buttonE1.addEventListener("click", createTaskHandler)