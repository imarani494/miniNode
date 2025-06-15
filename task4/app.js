const {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  completeTask,
  searchTasks,
  setPreference
} = require('./taskManager');

const command = process.argv[2];

switch (command) {
  case 'add-task':
    addTask(process.argv[3], process.argv[4]);
    break;
  case 'list-tasks':
    listTasks();
    break;
  case 'update-task':
    updateTask(process.argv[3], process.argv[4], process.argv[5]);
    break;
  case 'delete-task':
    deleteTask(process.argv[3]);
    break;
  case 'complete-task':
    completeTask(process.argv[3]);
    break;
  case 'search-tasks':
    searchTasks(process.argv[3]);
    break;
  case 'set-preference':
    setPreference(process.argv[3]);
    break;
  default:
    console.log('Invalid command.');
}
