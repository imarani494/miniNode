const { addTask, listTasks, deleteTask, updateTask, setPreference } = require('./taskManager');

const command = process.argv[2];

switch (command) {
  case 'add':
    addTask(process.argv[3], process.argv[4]);
    break;
  case 'list':
    listTasks();
    break;
  case 'delete':
    deleteTask(process.argv[3]);
    break;
  case 'update':
    updateTask(process.argv[3], process.argv[4], process.argv[5]);
    break;
  case 'set-preference':
    setPreference(process.argv[3]);
    break;
  default:
    console.log('Unknown command. Use: add, list, delete, update, set-preference');
}
