// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task));

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Complete task on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = !task.completed;
        updateLocalStorage();
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent marking complete
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        updateLocalStorage();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return alert('Please enter a task!');

    const task = { text: taskText, completed: false };
    tasks.push(task);
    addTaskToDOM(task);
    updateLocalStorage();
    taskInput.value = '';
});

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
