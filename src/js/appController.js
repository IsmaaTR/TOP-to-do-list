import "../styles.css";
import { taskModule } from "./taskModule.js";
import { projectModule } from "./projectModule.js";
import { UIModule } from "./UIModule.js";

window.appController = (function () {

    let projects = [];

    function init() {
        UIModule.init(appController);
    }

    function findProject(id) {
        return projects.find(project => project.id === id);
    }

    function addProject(name) {
        const project = projectModule.createProject(name);
        projects.push(project);
        UIModule.renderProjectList(projects);
    }

    function deleteProject(id) {
        projects = projects.filter(project => project.id !== id);
        console.log(projects);
        return projects;
    }

    function addTask(projectId, title, description, priority, dueDate) {
        const task = taskModule.createTask(title, description, priority, dueDate);
        const projectTasks = findProject(projectId).addTask(task);
        console.log(projectTasks);
    }

    function deleteTask(projectId, taskId) {
        const projectTasks = findProject(projectId).deleteTask(taskId);
        console.log(projectTasks);
    }

    function finishTask(projectId, taskId) {
        findProject(projectId).finishTask(taskId);
    }

    return { init, addProject, deleteProject, addTask, deleteTask, finishTask, get projects() { return projects; } };
})();

appController.init();