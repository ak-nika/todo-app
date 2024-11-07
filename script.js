const tasksContainer = document.getElementById("tasks");
const taskInput = document.getElementById("input");
const addBtn = document.getElementById("add");

// Initialize tasks in localStorage if not present
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

// Event listener to handle task clicks for toggling completion status
tasksContainer.addEventListener("click", (event) => {
  // Check if the clicked element is inside a task div
  const taskDiv = event.target.closest(".task");

  // If the click is inside a task div, proceed
  if (taskDiv) {
    // Get the task ID from the data attribute of the task div
    const taskId = taskDiv.getAttribute("data-id");

    // If the clicked element is not the checkbox itself, toggle the completion
    if (event.target.tagName !== "INPUT") {
      // Click the checkbox to toggle completion
      const checkbox = taskDiv.querySelector("input[type='checkbox']");
      checkbox.checked = !checkbox.checked;
      toggleComplete(taskId); // Pass the taskId to the function
    }
  }
});

// Event listener to add a new task
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task");
    return;
  } else {
    // Create a new task object
    const newTask = {
      id: Date.now().toString(), // Ensure the id is a string (or use .toString() if it's a number)
      task: taskInput.value,
      isCompleted: false,
    };

    // Get current tasks from localStorage and add the new task
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Re-render tasks to display the new one
    renderTasks();
    taskInput.value = ""; // Clear input field
  }
});

// Function to render tasks from localStorage
const renderTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasksContainer.innerHTML = ""; // Clear the current task container

  tasks.forEach((task) => {
    // Dynamically create each task div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-id", task.id); // Set the task ID as a data attribute

    // Create the checkbox input
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted; // Set the checkbox state based on the task completion
    checkbox.addEventListener("change", toggleComplete(task.id));

    // Add a span for the task name
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.task;

    // Create a div for icons (edit and delete)
    const iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    // Create the edit button (SVG)
    const editButton = document.createElement("button");
    editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
      </svg>
    `;

    // Create the delete button (SVG)
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
        <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
      </svg>
    `;

    // Append the buttons to the icons div
    iconsDiv.appendChild(editButton);
    iconsDiv.appendChild(deleteButton);

    // Append the checkbox, span, and icons to the task div
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(iconsDiv);

    // Append the task div to the tasks container
    tasksContainer.appendChild(taskDiv);
  });
};

// Function to toggle task completion status
const toggleComplete = (id) => {
  // Retrieve tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  // Find the task with the matching ID (ensure both are strings)
  const task = tasks.find((task) => task.id === id);

  // If the task is found, toggle the isCompleted property
  if (task) {
    task.isCompleted = !task.isCompleted;

    // Update the tasks array in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Re-render tasks to reflect the updated state
    // renderTasks();
  } else {
    console.error(`Task with id ${id} not found`);
  }
};

// Initial rendering of tasks on page load
window.onload = () => {
  renderTasks();
};
