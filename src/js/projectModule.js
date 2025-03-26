export const projectModule = (function () {

    let lastId = 0;
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1};

    function createProject(name) {

        const id = ++lastId;
        let tasks = [];

        function addTask(task) {
            tasks.push(task);
            tasks.sort((task1, task2) => {
                if (task1.finished !== task2.finished) {
                    return task1.finished - task2.finished;
                }
                return priorityOrder[task2.priority] - priorityOrder[task1.priority];
            })
            return tasks;
        }

        function deleteTask(id) {
            tasks.forEach( task => {
                if (task.id === id) {
                    tasks = tasks.filter(task => task.id !== id);
                }
            });
        }

        function finishTask(id) {
            tasks.forEach( task => {
                if (task.id === id) {
                    task.finish();
                }
            });
        }

        return {
            name,
            get tasks() { return tasks; },
            get id() { return id; },
            addTask,
            deleteTask,
            finishTask
        }
    }

    return { createProject };
})();