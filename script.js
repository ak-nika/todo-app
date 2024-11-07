const tasksContainer = document.getElementById("tasks");
const taskInput = document.getElementById("input");
const addBtn = document.getElementById("add");

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

tasksContainer.addEventListener("click", (event) => {
  // Check if the clicked element is a task div or inside it
  const taskDiv = event.target.closest(".task");

  if (taskDiv) {
    // Prevent toggling if the checkbox itself is clicked directly
    if (event.target.tagName !== "INPUT") {
      // Find the checkbox within the task div and toggle it
      const checkbox = taskDiv.querySelector(".task input");
      checkbox.checked = !checkbox.checked;
    }
  }
});

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  } else {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      isCompleted: false,
    };
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask();
    taskInput.value = "";
  }
});

const displayTask = () => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", toggleComplete());

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskInput.value;

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");

  // Add Edit Button (SVG for Edit)
  const editButton = document.createElement("button");
  editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      `;

  // Add Delete Button (SVG for Delete)
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
        </svg>
      `;

  // Append everything to the task div
  iconsDiv.appendChild(editButton);
  iconsDiv.appendChild(deleteButton);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskSpan);
  taskDiv.appendChild(iconsDiv);

  // Append the new task div to the container
  tasksContainer.appendChild(taskDiv);
};

const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasksContainer.innerHTML = ""; // Clear existing content

  tasks.forEach((task) => {
    // Dynamically create task divs and append checkboxes
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.addEventListener("click", toggleComplete(task.id));

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.task;

    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    // Add Edit Button (SVG for Edit)
    const editButton = document.createElement("button");
    editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      `;

    // Add Delete Button (SVG for Delete)
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
        </svg>
      `;

    // Append everything to the task div
    iconsDiv.appendChild(editButton);
    iconsDiv.appendChild(deleteButton);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(iconsDiv);

    // Append the new task div to the container
    tasksContainer.appendChild(taskDiv);
  });
};

window.onload = () => {
  renderTasks();
};

const toggleComplete = (id) => {
  const toggleComplete = (id) => {
    // Retrieve tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    // Find the task by id
    const task = tasks.find((task) => task.id === id);

    // If the task is found, toggle the completion status
    if (task) {
      task.isCompleted = !task.isCompleted;

      // Update the tasks array in localStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      return;
    }
  };
};
