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
