// main.js

import { markAsCompleted, markAsIncomplete, filterCompleted } from './status.js';

const items = [
  { name: 'Task 1', completed: false },
  { name: 'Task 2', completed: false },
  { name: 'Task 3', completed: true },
];

function getItemIndexFromCheckbox(checkbox) {
  const itemId = checkbox.dataset.itemId;
  for (let i = 0; i < items.length; i++) {
    if (items[i].name === itemId) {
      return i;
    }
  }
  return -1; // item not found
}

const checkboxes = document.querySelectorAll('.completed-checkbox');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const itemIndex = getItemIndexFromCheckbox(event.target);
    if (itemIndex >= 0) {
      if (event.target.checked) {
        markAsCompleted(items[itemIndex]);
      } else {
        markAsIncomplete(items[itemIndex]);
      }
      // update the UI to reflect the change
    }
  });
});

const clearCompletedButton = document.querySelector('#clear-completed-button');
clearCompletedButton.addEventListener('click', () => {
  items = filterCompleted(items);
  // update the UI to reflect the change
});

localStorage.setItem('items', JSON.stringify(items));




// Define the task array with sample tasks
const tasks = [
  {
    description: 'Task 1',
    completed: false,
    index: 0,
  },
  {
    description: 'Task 2',
    completed: true,
    index: 1,
  },
  {
    description: 'Task 3',
    completed: false,
    index: 2,
  },
];

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


