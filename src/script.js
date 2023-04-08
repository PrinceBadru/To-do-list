// status.js

function markAsCompleted(item) {
  item.completed = true;
}

function markAsIncomplete(item) {
  item.completed = false;
}

function filterCompleted(items) {
  return items.filter((item) => !item.completed);
}

// main.js

import { markAsCompleted, markAsIncomplete, filterCompleted } from './status.js';

let items = JSON.parse(localStorage.getItem('items')) || [];

function addTask(description) {
  const task = { description, completed: false };
  items.push(task);
  localStorage.setItem('items', JSON.stringify(items));
}

function getItemIndexFromCheckbox(checkbox) {
  const itemId = checkbox.dataset.itemId;
  for (let i = 0; i < items.length; i++) {
    if (items[i].description === itemId) {
      return i;
    }
  }
  return -1; // item not found
}

function populateTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  items.forEach((item, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    checkbox.dataset.itemId = item.description;
    checkbox.id = `checkbox${index}`;
    const label = document.createElement('label');
    label.setAttribute('for', `checkbox${index}`);
    label.textContent = item.description;
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    taskList.appendChild(listItem);
  });
}

const form = document.getElementById('newTaskForm');
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

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', (event) => {
    const itemIndex = getItemIndexFromCheckbox(event.target);
    if (itemIndex >= 0) {
      if (event.target.checked) {
        markAsCompleted(items[itemIndex]);
      } else {
        markAsIncomplete(items[itemIndex]);
      }
      localStorage.setItem('items', JSON.stringify(items));
    }
  });
});

const clearCompletedButton = document.getElementById('clearCompletedButton');
clearCompletedButton.addEventListener('click', () => {
  items = filterCompleted(items);
  localStorage.setItem('items', JSON.stringify(items));
  populateTasks();
});

const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', () => {
  items = [];
  localStorage.setItem('items', JSON.stringify(items));
  populateTasks();
});

const filterCompletedButton = document.getElementById('filterCompletedButton');
filterCompletedButton.addEventListener('click', () => {
  items = filterCompleted(items);
  populateTasks();
});

const filterAllButton = document.getElementById('filterAllButton');
filterAllButton.addEventListener('click', () => {
  items = JSON.parse(localStorage.getItem('items')) || [];
  populateTasks();
});

populateTasks();
