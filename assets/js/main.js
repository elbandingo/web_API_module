var buttonE1 = document.querySelector("#save-task"); //creating element to call based on HTML ID
var tasksToDoE1 = document.querySelector("#tasks-to-do"); //creating element to call based on HTML ID
var createTaskHandler = function() {
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "this is a new task";
    tasksToDoE1.appendChild(listItemE1);
}


buttonE1.addEventListener("click", createTaskHandler)