
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

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const populateTasks = () => {
  const parentElement = document.getElementById('taskList');
  parentElement.innerHTML = '';
  tasks.forEach((task, index) => {
    const { description, completed } = task;
    const id = `task${index}`;
    const innerHTML = `
      <p>${description}</p>
      <p>${completed ? 'completed' : 'not completed'}</p>
      <button class="removeButton" data-id="${id}">Remove</button>
      <input type="checkbox" ${completed ? 'checked' : ''} data-id="${id}">
    `;
    const newTodoListElement = document.createElement('li');
    Object.assign(newTodoListElement, { innerHTML, id });
    parentElement.appendChild(newTodoListElement);
  });
};

const addTask = (description) => {
  const task = {
    description,
    completed: false,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateTasks();
};

const removeButtonHandler = (event) => {
  const { id } = event.target.dataset;
  const index = tasks.findIndex((task) => `task${task.index}` === id);
  deleteTask(index);
};

const checkboxHandler = (event) => {
  const { id } = event.target.dataset;
  const index = tasks.findIndex((task) => `task${task.index}` === id);
  tasks[index].completed = event.target.checked;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  populateTasks();
};

const addTaskHandler = () => {
  const description = prompt('Enter task description:');
  if (description) {
    addTask(description);
  }
};

document.getElementById('addButton').addEventListener('click', addTaskHandler);

document.getElementById('taskList').addEventListener('click', (event) => {
  if (event.target.matches('.removeButton')) {
    removeButtonHandler(event);
  } else if (event.target.matches('input[type="checkbox"]')) {
    checkboxHandler(event);
  }
});

populateTasks();
