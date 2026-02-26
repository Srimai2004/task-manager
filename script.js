const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    // ✅ THIS IS IMPORTANT FOR PRIORITY COLORS
    li.setAttribute("data-priority", task.priority);

    li.innerHTML = `
      <span>${task.title} (${task.priority})</span>
      <div class="buttons">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add task
addBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();
  const priority = priorityInput.value;

  if (title === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({ title, priority });
  saveTasks();
  renderTasks();

  taskInput.value = "";
});

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newTitle = prompt("Edit task:", tasks[index].title);
  if (newTitle !== null && newTitle.trim() !== "") {
    tasks[index].title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
}

// Initial render
renderTasks();