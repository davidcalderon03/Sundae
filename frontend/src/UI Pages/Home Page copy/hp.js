function generateMiniTasks(taskId) {
    const miniTasksContainer = document.querySelector(`#${taskId} .mini-tasks`);
    miniTasksContainer.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const miniTask = document.createElement('p');
        miniTask.textContent = `Mini Task ${i} for ${taskId}`;
        miniTasksContainer.appendChild(miniTask);
    }
}
