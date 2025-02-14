document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('clearCompletedBtn').addEventListener('click', clearCompletedTasks);
document.getElementById('filterAll').addEventListener('click', () => filterTasks('all'));
document.getElementById('filterActive').addEventListener('click', () => filterTasks('active'));
document.getElementById('filterCompleted').addEventListener('click', () => filterTasks('completed'));
document.addEventListener('DOMContentLoaded', loadTasks);

let isEditing = false;
let editIndex = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.querySelector('input[name="priority"]:checked');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const tasks = getTasksFromLocalStorage();

    if (isEditing) {
        // Update the existing task
        tasks[editIndex].text = taskText;
        tasks[editIndex].priority = priority;
        isEditing = false;
        editIndex = null;
    } else {
        // Add a new task
        const task = {
            text: taskText,
            completed: false,
            priority: priority
        };
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
    updateAddButton();
}

function loadTasks(filter = 'all') {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const priorityIndicator = document.createElement('span');
        priorityIndicator.className = `priority-indicator priority-${task.priority}`;
        li.appendChild(priorityIndicator);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        li.appendChild(taskTextSpan);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const tickIcon = document.createElement('span');
        tickIcon.innerHTML = '&#10004;'; // Tick icon
        tickIcon.className = 'tick-icon';
        tickIcon.onclick = (event) => {
            event.stopPropagation();
            toggleTaskCompletion(index);
        };
        taskActions.appendChild(tickIcon);

        const editIcon = document.createElement('span');
        editIcon.innerHTML = '&#9998;'; // Edit icon
        editIcon.className = 'edit-icon';
        editIcon.onclick = (event) => {
            event.stopPropagation();
            editTask(index);
        };
        taskActions.appendChild(editIcon);

        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&times;'; // Delete icon
        deleteIcon.className = 'delete-icon';
        deleteIcon.onclick = (event) => {
            event.stopPropagation();
            deleteTask(index);
        };
        taskActions.appendChild(deleteIcon);

        li.appendChild(taskActions);
        taskList.appendChild(li);
    });

    updateFilterButtonStyles(filter);
}

function updateAddButton() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (isEditing) {
        addTaskBtn.innerHTML = '<i class="fas fa-save"></i>';
    } else {
        addTaskBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
}

function editTask(index) {
    const tasks = getTasksFromLocalStorage();
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.querySelector(`input[name="priority"][value="${tasks[index].priority}"]`);

    // Populate the input field with the task text
    taskInput.value = tasks[index].text;
    // Set the priority radio button
    prioritySelect.checked = true;

    // Set editing state
    isEditing = true;
    editIndex = index;

    // Update the button to "Save"
    updateAddButton();
}

function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function clearCompletedTasks() {
    const tasks = getTasksFromLocalStorage();
    const incompleteTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(incompleteTasks));
    loadTasks();
}

function filterTasks(filter) {
    loadTasks(filter);
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}