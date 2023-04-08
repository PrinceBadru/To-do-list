// Define tasks array
let tasks = [];

// Get tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks) {
  tasks = storedTasks;
}

// Define function to save tasks to local storage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Define function to add new task
const addTask = (description) => {
  const task = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  saveTasksToLocalStorage();
  return task;
};

// Define function to delete task
const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.index !== id);
  tasks.forEach((task, index) => {
    task.index = index;
  });
  saveTasksToLocalStorage();
};

// Define function to edit task description
const editTask = (id, newDescription) => {
  tasks = tasks.map((task) => {
    if (task.index === id) {
      return {
        ...task,
        description: newDescription,
      };
    }
    return task;
  });
  saveTasksToLocalStorage();
};

// Define function to render tasks to DOM
const renderTasks = () => {
  const parentElement = document.getElementById('taskList');
  parentElement.innerHTML = '';
  tasks.forEach((task) => {
    const { description, completed, index: id } = task;
    const innerHTML = `
      <p>${description}</p>
      <p>${completed ? 'completed' : 'not completed'}</p>
      <button class="removeButton">Remove</button>
      <input type="checkbox" ${completed ? 'checked' : ''}>
    `;
    const newTodoListElement = document.createElement('li');
    Object.assign(newTodoListElement, { innerHTML, id });
    parentElement.appendChild(newTodoListElement);
  });
};

// Add event listener for adding tasks
const addTaskButton = document.getElementById('addTaskButton');
addTaskButton.addEventListener('click', () => {
  const taskInput = document.getElementById('newTaskInput');
  const description = taskInput.value;
  addTask(description);
  taskInput.value = '';
  renderTasks();
});

// Add event listener for deleting tasks
const taskList = document.getElementById('taskList');
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('removeButton')) {
    const taskElement = event.target.parentElement;
    const id = parseInt(taskElement.id);
    deleteTask(id);
    renderTasks();
  }
});

// Add event listener for editing tasks
taskList.addEventListener('blur', (event) => {
  if (event.target.tagName === 'P') {
    const taskElement = event.target.parentElement;
    const id = parseInt(taskElement.id);
    const newDescription = event.target.textContent;
    editTask(id, newDescription);
  }
});

// Render initial tasks to DOM
renderTasks();
