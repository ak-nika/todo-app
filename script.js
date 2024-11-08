const tasksContainer = document.getElementById("tasks");
const taskInput = document.getElementById("input");
const addBtn = document.getElementById("add");

// Initialize tasks in localStorage if not present
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

// Event listener to handle task clicks for toggling completion status
tasksContainer.addEventListener("click", (event) => {
  const taskDiv = event.target.closest(".task");
  if (taskDiv) {
    const taskId = taskDiv.getAttribute("data-id");
    if (event.target.tagName !== "INPUT") {
      const checkbox = taskDiv.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked;
      toggleComplete(taskId);
    }
  }
});

// Function to add a new task
const addTask = () => {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  } else {
    const newTask = {
      id: Date.now().toString(),
      task: taskInput.value,
      isCompleted: false,
    };

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
};

// Add task on click
addBtn.addEventListener("click", addTask);

// Add task on hit of Enter key in input
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Function to render tasks from localStorage
const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-id", task.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.task;

    if (task.isCompleted) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "#bbb";
    }

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    const editButton = document.createElement("button");
    editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
      </svg>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
      </svg>
    `;
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    iconsDiv.appendChild(editButton);
    iconsDiv.appendChild(deleteButton);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(iconsDiv);

    tasksContainer.appendChild(taskDiv);
  });
};

// Function to toggle task completion status
const toggleComplete = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.isCompleted = !task.isCompleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // renderTasks();
  } else {
    console.error(`Task with id ${id} not found`);
  }
};

// Initial rendering of tasks on page load
window.onload = () => {
  renderTasks();
};

// Function to delete task
const deleteTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  renderTasks();
};
