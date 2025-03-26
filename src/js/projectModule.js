export const projectModule = (function () {

    let lastId = 0;

    function createProject(name) {

        const id = ++lastId;
        let tasks = [];

        function addTask(task) {
            tasks.push(task);
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