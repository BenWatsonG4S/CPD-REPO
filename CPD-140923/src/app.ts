// Enum for task types
enum TaskType {  // <--------- Enumerated list of the only valid tasks allowed in this app.
    WORK = "Work",
    PERSONAL = "Personal",
    HOBBY = "Hobby",
    EXERCISE = "Exercise",
    COOKING = "Cooking"
}

// Interface for tasks
interface Task {  // <-------- Acting as a contract between the created tasks to always hold this desired shape
    id: number;
    name: string;
    type: TaskType;
    dueDate: Date;
}

// Array to hold tasks
let tasks: Task[] = [];

// Default Task Name Counter
let defaultTaskNameCounter: number = 1;

// Function to populate the task type dropdown with enum values
function populateTaskTypeDropdown(): void {
    const taskTypeDropdown = document.getElementById("taskType") as HTMLSelectElement;
    for (const taskType in TaskType) {
        if (TaskType.hasOwnProperty(taskType)) {  // <----------- To ensure that only the direct properties of the TaskType enum                                                        
            const option = document.createElement("option"); //   are considered, not any potentially inherited ones.
            option.value = TaskType[taskType as keyof typeof TaskType];  // sets the string value of the current looked at task type
            option.textContent = TaskType[taskType as keyof typeof TaskType]; // sets the string value of the current looked at task type
            taskTypeDropdown.appendChild(option); // add to dropdown
        }
    }
}

function setDefaultDateInput(): void {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const dateInput = document.getElementById("taskDueDate") as HTMLInputElement;
    dateInput.value = formattedDate;
}

function setDefaultTaskNameInput(): void {
    const taskNameString = `Task ${defaultTaskNameCounter}`;
    const taskNameInput = document.getElementById("taskName") as HTMLInputElement;
    taskNameInput.value = taskNameString;
    defaultTaskNameCounter += 1;
}

// Function to add a task to the array
function addTask(name: string, type: TaskType, dueDate: Date): void {
    const newTask: Task = {
        id: Date.now(),
        name,
        type,
        dueDate
    };
    tasks.push(newTask);
}

// Function to add task from user input
function addTaskFromInput(): void {
    const taskName = (document.getElementById("taskName") as HTMLInputElement).value;
    const taskType = (document.getElementById("taskType") as HTMLSelectElement).value as TaskType;
    const taskDueDate = new Date((document.getElementById("taskDueDate") as HTMLInputElement).value);
    
    addTask(taskName, taskType, taskDueDate);
    displayTasks();

    // Clearing the input fields after adding a task
    setDefaultTaskNameInput();
    (document.getElementById("taskType") as HTMLSelectElement).value = TaskType.WORK;  // Default value after clearing
    setDefaultDateInput();

    
}

// Function to display tasks on the web page
function displayTasks(): void {
    const taskList = document.getElementById("taskList") as HTMLUListElement;
    taskList.innerHTML = '';  // Clear existing tasks

    for (const task of tasks) {
        const listItem = document.createElement("li");

        // Create span for task text
        const taskTextSpan = document.createElement("span");
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = `${task.name} (${task.type}) - Due: ${task.dueDate.toDateString()}`;
        listItem.appendChild(taskTextSpan);
        
        const actionButton = document.createElement("button");
            
        switch (task.type) {
            case TaskType.WORK:
                actionButton.textContent = "Complete Work";
                actionButton.onclick = () => workAction(task.id);
                break;
            case TaskType.PERSONAL:
                actionButton.textContent = "Address Personal";
                actionButton.onclick = () => personalAction(task.id);
                break;
            case TaskType.HOBBY:
                actionButton.textContent = "Engage Hobby";
                actionButton.onclick = () => hobbyAction(task.id);
                break;
            case TaskType.EXERCISE:
                actionButton.textContent = "Exercise";
                actionButton.onclick = () => exerciseAction(task.id);
                break;
            case TaskType.COOKING:
                actionButton.textContent = "Cook";
                actionButton.onclick = () => cookAction(task.id);
                break;
        }
        
        listItem.appendChild(actionButton);
        taskList.appendChild(listItem);
    }
    
}


function removeTaskById(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

// Action Tasks
function workAction(taskId: number): void {
    alert(`Completing work task: ${taskId}`);
    removeTaskById(taskId);
}

function personalAction(taskId: number): void {
    alert(`Addressing personal task: ${taskId}`);
    removeTaskById(taskId);
}

function hobbyAction(taskId: number): void {
    alert(`Engaging in hobby task: ${taskId}`);
    removeTaskById(taskId);
}

function exerciseAction(taskId: number): void {
    alert(`Exercising for task: ${taskId}`);
    removeTaskById(taskId);
}

function cookAction(taskId: number): void {
    alert(`Cooking for task: ${taskId}`);
    removeTaskById(taskId);
}

document.addEventListener("DOMContentLoaded", () => {
    populateTaskTypeDropdown();
    setDefaultDateInput();
    setDefaultTaskNameInput();
});