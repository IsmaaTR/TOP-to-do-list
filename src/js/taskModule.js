export const taskModule = (function () {

    let lastId = 0;

    function createTask(title, description, dueDate, priority, finished) {

        const id = ++lastId;

        function finish() {
            finished = true;
        }

        return { 
            get id() { return id; },
            get finished() { return finished },
            title, 
            description, 
            dueDate, 
            priority,
            finish };
    }

    return { createTask }
})();