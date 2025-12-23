const loadTasksBtn = document.getElementById('loadTasksBtn');
const statusMessage = document.getElementById('statusMessage');
const taskListContainer = document.getElementById('container');

const taskManager = new TaskManager();

function renderTasks() {
    taskListContainer.innerHTML = '';

    const tasks = taskManager.getTasks();

    if (tasks.length === 0) {
        taskListContainer.innerHTML = '<p>No tasks found.</p>';
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = task.title;

        const buttonGroup = document.createElement('div');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
        toggleBtn.style.marginRight = '10px';
        
        toggleBtn.addEventListener('click', () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        
        deleteBtn.addEventListener('click', () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        buttonGroup.appendChild(toggleBtn);
        buttonGroup.appendChild(deleteBtn);

        taskDiv.appendChild(titleSpan);
        taskDiv.appendChild(buttonGroup);

        taskListContainer.appendChild(taskDiv);
    });
}

loadTasksBtn.addEventListener('click', async () => {
    statusMessage.textContent = "Loading tasks...";
    statusMessage.style.color = "black";
    loadTasksBtn.disabled = true;

    try {
        const rawData = await API.fetchTasks();

        const taskInstances = rawData.map(item => new Task(item.id, item.title, item.completed));

        taskManager.setTasks(taskInstances);

        renderTasks();

        statusMessage.textContent = "Tasks loaded!";
        setTimeout(() => { statusMessage.textContent = ""; }, 2000);

    } catch (error) {
        console.error("Hata Detayı:", error);
        statusMessage.textContent = "Error: Failed to load tasks from server.";
        statusMessage.style.color = "red";
    
    } finally {
        loadTasksBtn.disabled = false;
    }
});