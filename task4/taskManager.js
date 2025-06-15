const fs = require('fs');
const filePath = './tasks.json';

let preferences = { filter: 'all' };

function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function isValidDate(dateStr) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
}

function addTask(title, dueDate) {
  if (!title || !dueDate || !isValidDate(dueDate)) {
    return console.log('Error: Title and due date (YYYY-MM-DD) are required.');
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
  console.log('Task has been added.');
}

function listTasks() {
  const tasks = loadTasks();
  const filtered = tasks.filter(task =>
    preferences.filter === 'all' ||
    (preferences.filter === 'completed' && task.completed) ||
    (preferences.filter === 'pending' && !task.completed)
  );

  if (!filtered.length) return console.log('No tasks found.');

  filtered.forEach(t => {
    console.log(`ID: ${t.id}, Title: ${t.title}, Due: ${t.dueDate}, Status: ${t.completed ? 'Completed' : 'Pending'}`);
  });
}

function updateTask(identifier, newTitle, newDueDate) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === identifier || t.title === identifier);

  if (!task) return console.log('Task not found.');
  if (newTitle) task.title = newTitle;
  if (newDueDate) {
    if (!isValidDate(newDueDate)) {
      return console.log('Invalid date format.');
    }
    task.dueDate = newDueDate;
  }

  saveTasks(tasks);
  console.log('Task updated successfully.');
}

function deleteTask(identifier) {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === identifier || t.title === identifier);
  if (index === -1) return console.log('Task not found.');

  tasks.splice(index, 1);
  saveTasks(tasks);
  console.log('Task deleted.');
}

function completeTask(identifier) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === identifier || t.title === identifier);
  if (!task) return console.log('Task not found.');

  task.completed = true;
  saveTasks(tasks);
  console.log('Task marked as completed.');
}

function searchTasks(keyword) {
  const tasks = loadTasks();
  const results = tasks.filter(t => t.title.includes(keyword) || t.dueDate === keyword);

  if (!results.length) return console.log('No matches found.');
  results.forEach(t => {
    console.log(`ID: ${t.id}, Title: ${t.title}, Due: ${t.dueDate}, Status: ${t.completed ? 'Completed' : 'Pending'}`);
  });
}

function setPreference(filter) {
  const valid = ['all', 'completed', 'pending'];
  if (!valid.includes(filter)) return console.log('Invalid filter type.');

  preferences.filter = filter;
  console.log(`Filter set to ${filter}`);
}

module.exports = {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  completeTask,
  searchTasks,
  setPreference
};
