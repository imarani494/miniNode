const {
  addTask,
  listTasks,
  deleteTask,
  updateTask,
  setPreference,
  searchTasks,
} = require('./taskManager');

const command = process.argv[2];

switch (command) {
  case 'add':
    addTask(process.argv[3], process.argv[4]);
    break;
  case 'list':
    listTasks();
    break;
  case 'delete-task':
    deleteTask(process.argv[3]);
    break;
  case 'update-task':
    updateTask(process.argv[3], process.argv[4], process.argv[5]);
    break;
  case 'set-preference':
    setPreference(process.argv[3]);
    break;
  case 'search-tasks':
    searchTasks(process.argv[3]);
    break;
  default:
    console.log('Invalid command. Use: add, list, delete-task, update-task, set-preference, search-tasks');
}
