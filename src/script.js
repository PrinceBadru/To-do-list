// Define the task array
const tasks = [];

// Define the function to add new task
const addTask = (description) => {
  const task = {
    description,
    completed: false,
    index: tasks.length,
  };
  tasks.push(task);
  return task;
};

// Define the function to toggle task completion status
const toggleTaskCompletion = (id) => {
  const task = tasks[id];
  task.completed = !task.completed;
  return task;
};

// Define the function to remove a task
const removeTask = (id) => {
  tasks.splice(id, 1);
};

// Define the function to populate the task list
const populateTasks = () => {
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

// Add event listener for form submission
const form = document.getElementById('addTaskForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('newTaskInput');
  const description = input.value.trim();
  if (description) {
    addTask(description);
    input.value = '';
    populateTasks();
  }
});

// Add event listener for task completion checkbox
const taskList = document.getElementById('taskList');
taskList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.type === 'checkbox') {
    const id = Number(target.parentElement.id);
    toggleTaskCompletion(id);
    populateTasks();
  }
});

// Add event listener for remove button
taskList.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('removeButton')) {
    const id = Number(target.parentElement.id);
    removeTask(id);
    populateTasks();
  }
});

// Initial population of task list
populateTasks();
