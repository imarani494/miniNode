const fs = require('fs');
const path = './tasks.json';

let preferences = { filter: 'all' };

// Load tasks from JSON
function loadTasks() {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Save tasks to JSON
function saveTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

function isValidDate(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

function addTask(title, dueDate) {
  if (!title) {
    console.log('Error: Task title cannot be empty.');
    return;
  }

  if (!isValidDate(dueDate)) {
    console.log('Error: Due date must be in YYYY-MM-DD format.');
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: Date.now().toString(),
    title,
    dueDate,
    completed: false
  };

  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Task added successfully!');
}

function listTasks() {
  const tasks = loadTasks();
  let filteredTasks = tasks;

  if (preferences.filter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (preferences.filter === 'pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  if (filteredTasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  filteredTasks.forEach(task => {
    console.log(`ID: ${task.id}, Title: ${task.title}, Due: ${task.dueDate}, Completed: ${task.completed}`);
  });
}

function deleteTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    console.log('Error: Task ID not found.');
    return;
  }

  tasks.splice(index, 1);
  saveTasks(tasks);
  console.log('Task deleted successfully!');
}

function updateTask(id, newTitle, newDate) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    console.log('Error: Task ID not found.');
    return;
  }

  if (newTitle) task.title = newTitle;
  if (newDate && isValidDate(newDate)) task.dueDate = newDate;

  saveTasks(tasks);
  console.log('Task updated successfully!');
}

function setPreference(filterOption) {
  const validOptions = ['all', 'completed', 'pending'];

  if (!validOptions.includes(filterOption)) {
    console.log('Error: Invalid preference. Use all, completed, or pending.');
    return;
  }

  preferences.filter = filterOption;
  console.log(`Preference set to '${filterOption}' successfully.`);
}

module.exports = {
  addTask,
  listTasks,
  deleteTask,
  updateTask,
  setPreference
};
