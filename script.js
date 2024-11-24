// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const dateElement = document.getElementById("date");

// Display Current Date
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
dateElement.textContent = `Today is ${formattedDate}`;

// Validate Input
function validateInput(taskText) {
  if (taskText === "") {
    showError("Task cannot be empty!");
    return false;
  }
  const existingTasks = document.querySelectorAll(".task-item input");
  for (let task of existingTasks) {
    if (task.value.toLowerCase() === taskText.toLowerCase()) {
      showError("Task already exists!");
      return false;
    }
  }
  return true;
}

// Show Error Message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 3000);
}

// Add Task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!validateInput(taskText)) return;

  // Create task element
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  // Add task text
  const taskInputField = document.createElement("input");
  taskInputField.type = "text";
  taskInputField.value = taskText;
  taskInputField.setAttribute("readonly", "readonly");
  taskItem.appendChild(taskInputField);

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Edit";
  taskItem.appendChild(editBtn);

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  taskItem.appendChild(deleteBtn);

  // Add task item to list
  taskList.appendChild(taskItem);
  taskInput.value = "";

  // Edit Task
  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      taskInputField.removeAttribute("readonly");
      taskInputField.focus();
      editBtn.textContent = "Save";
    } else {
      taskInputField.setAttribute("readonly", "readonly");
      editBtn.textContent = "Edit";
    }
  });

  // Delete Task
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });
}

// Add Task Event
addTaskBtn.addEventListener("click", addTask);

// Allow Enter Key to Add Task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

             