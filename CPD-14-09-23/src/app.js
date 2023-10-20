// Enum for task types
var TaskType;
(function (TaskType) {
    TaskType["WORK"] = "Work";
    TaskType["PERSONAL"] = "Personal";
    TaskType["HOBBY"] = "Hobby";
    TaskType["EXERCISE"] = "Exercise";
    TaskType["COOKING"] = "Cooking";
})(TaskType || (TaskType = {}));
// Array to hold tasks
var tasks = [];
// Default Task Name Counter
var defaultTaskNameCounter = 1;
// Function to populate the task type dropdown with enum values
function populateTaskTypeDropdown() {
    var taskTypeDropdown = document.getElementById("taskType");
    for (var taskType in TaskType) {
        if (TaskType.hasOwnProperty(taskType)) { // <----------- To ensure that only the direct properties of the TaskType enum                                                        
            var option = document.createElement("option"); //   are considered, not any potentially inherited ones.
            option.value = TaskType[taskType]; // sets the string value of the current looked at task type
            option.textContent = TaskType[taskType]; // sets the string value of the current looked at task type
            taskTypeDropdown.appendChild(option); // add to dropdown
        }
    }
}
function setDefaultDateInput() {
    var today = new Date();
    var formattedDate = "".concat(today.getFullYear(), "-").concat(String(today.getMonth() + 1).padStart(2, '0'), "-").concat(String(today.getDate()).padStart(2, '0'));
    var dateInput = document.getElementById("taskDueDate");
    dateInput.value = formattedDate;
}
function setDefaultTaskNameInput() {
    var taskNameString = "Task ".concat(defaultTaskNameCounter);
    var taskNameInput = document.getElementById("taskName");
    taskNameInput.value = taskNameString;
    defaultTaskNameCounter += 1;
}
// Function to add a task to the array
function addTask(name, type, dueDate) {
    var newTask = {
        id: Date.now(),
        name: name,
        type: type,
        dueDate: dueDate
    };
    tasks.push(newTask);
}
// Function to add task from user input
function addTaskFromInput() {
    var taskName = document.getElementById("taskName").value;
    var taskType = document.getElementById("taskType").value;
    var taskDueDate = new Date(document.getElementById("taskDueDate").value);
    addTask(taskName, taskType, taskDueDate);
    displayTasks();
    // Clearing the input fields after adding a task
    setDefaultTaskNameInput();
    document.getElementById("taskType").value = TaskType.WORK; // Default value after clearing
    setDefaultDateInput();
}
// Function to display tasks on the web page
function displayTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; // Clear existing tasks
    var _loop_1 = function (task) {
        var listItem = document.createElement("li");
        // Create span for task text
        var taskTextSpan = document.createElement("span");
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = "".concat(task.name, " (").concat(task.type, ") - Due: ").concat(task.dueDate.toDateString());
        listItem.appendChild(taskTextSpan);
        var actionButton = document.createElement("button");
        switch (task.type) {
            case TaskType.WORK:
                actionButton.textContent = "Complete Work";
                actionButton.onclick = function () { return workAction(task.id); };
                break;
            case TaskType.PERSONAL:
                actionButton.textContent = "Address Personal";
                actionButton.onclick = function () { return personalAction(task.id); };
                break;
            case TaskType.HOBBY:
                actionButton.textContent = "Engage Hobby";
                actionButton.onclick = function () { return hobbyAction(task.id); };
                break;
            case TaskType.EXERCISE:
                actionButton.textContent = "Exercise";
                actionButton.onclick = function () { return exerciseAction(task.id); };
                break;
            case TaskType.COOKING:
                actionButton.textContent = "Cook";
                actionButton.onclick = function () { return cookAction(task.id); };
                break;
        }
        listItem.appendChild(actionButton);
        taskList.appendChild(listItem);
    };
    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
        var task = tasks_1[_i];
        _loop_1(task);
    }
}
function removeTaskById(taskId) {
    tasks = tasks.filter(function (task) { return task.id !== taskId; });
    displayTasks();
}
// Action Tasks
function workAction(taskId) {
    alert("Completing work task: ".concat(taskId));
    removeTaskById(taskId);
}
function personalAction(taskId) {
    alert("Addressing personal task: ".concat(taskId));
    removeTaskById(taskId);
}
function hobbyAction(taskId) {
    alert("Engaging in hobby task: ".concat(taskId));
    removeTaskById(taskId);
}
function exerciseAction(taskId) {
    alert("Exercising for task: ".concat(taskId));
    removeTaskById(taskId);
}
function cookAction(taskId) {
    alert("Cooking for task: ".concat(taskId));
    removeTaskById(taskId);
}
document.addEventListener("DOMContentLoaded", function () {
    populateTaskTypeDropdown();
    setDefaultDateInput();
    setDefaultTaskNameInput();
});
