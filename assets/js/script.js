var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//TASK FORM HANDLER FUNCTION---------------------------------------------------------------------------------------
var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  alert("Task Updated!");
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name'").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }

  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

  createTaskEl(taskDataObj);
}
};


//---------------------------------------------------------------------------------------------
//VAR CREATE TASK EL FUNCTION
var createTaskEl = function(taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  console.dir(listItemEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add list item to list
  tasksToDoEl.appendChild(listItemEl);

 // increase task counter for next unique id
 taskIdCounter++;

};
//CREATE TASK ACTIONS----------------------------------------------------------------------------

var createTaskActions = function(taskId) {

  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button

  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //create drop down
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name","status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  //array
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    //option
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainerEl.appendChild(statusSelectEl);



  return actionContainerEl;

};


//---------------------------------------------------------------------------------------------
//EVENT LISTNER
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event){
  console.log(event.target);

  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 

  
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }

};
var editTask = function(taskId) {
  console.log("editing task #" + taskId);
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
console.log(taskName);
var taskType = taskSelected.querySelector("span.task-type").textContent;
console.log(taskType);
document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("data-task-id", taskId);

};

var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected);
  console.log(taskId);
  taskSelected. remove();
};

var taskStatusChangeHandler = function(event) {
console.log(event.target);
console.log(event.target.getAttribute("data-task-id"));
var taskId = event.target.getAttribute("data-task-id");
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
var statusValue = event.target.value.toLowerCase();
if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
} 
else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);
} 
else if (statusValue === "completed") {
  tasksCompletedEl.appendChild(taskSelected);
}

};
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);