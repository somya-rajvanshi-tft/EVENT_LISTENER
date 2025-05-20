const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelector('.filters');

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="done-btn">Mark as Done</button>
    <button class="remove-btn">Remove</button>
  `;
  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  const taskElement = createTaskElement(taskText);
  taskList.appendChild(taskElement);

  const event = new CustomEvent('task-added', {
    detail: { taskText }
  });
  document.dispatchEvent(event);

  taskInput.value = '';
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('done-btn')) {
    e.target.parentElement.querySelector('.task-text').classList.toggle('done');
  }
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
  }
});

filters.addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  const filter = e.target.dataset.filter;
  Array.from(taskList.children).forEach(li => {
    const isDone = li.querySelector('.task-text').classList.contains('done');
    li.style.display =
      filter === 'all' ? '' :
      filter === 'completed' && isDone ? '' :
      filter === 'pending' && !isDone ? '' : 'none';
  });
});

document.addEventListener('task-added', function (e) {
  console.log(`Task added: ${e.detail.taskText}`);
});
