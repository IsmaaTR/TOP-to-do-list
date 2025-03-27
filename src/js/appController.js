import "../styles.css";
import { taskModule } from "./taskModule.js";
import { projectModule } from "./projectModule.js";
import { UIModule } from "./UIModule.js";

window.appController = (function () {

    let projects = [];

    function init() {
        UIModule.init(appController);
        loadDatabaseProjects();
        UIModule.renderProjectList(projects);
    }

    function loadDatabaseProjects() {
        const projectsString = localStorage.getItem('projects');
        let projectDataArray = projectsString ? JSON.parse(projectsString) : [];
        projectDataArray.forEach(projectData => {
            const project = projectModule.createProject(projectData.name);
            projectData.tasks.forEach(taskData => {
                const task = taskModule.createTask(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
                project.addTask(task);
            });
            projects.push(project);
        });
    }

    function findProject(id) {
        return projects.find(project => project.id === id);
    }

    function addProject(name) {
        const project = projectModule.createProject(name);
        projects.push(project);
        actualizarInfoProyectos();
        UIModule.renderProjectList(projects);
    }

    function deleteProject(id) {
        projects = projects.filter(project => project.id !== id);
        actualizarInfoProyectos();
        UIModule.renderProjectList(projects);
    }

    function addTask(projectId, title, description, priority, dueDate) {
        const task = taskModule.createTask(title, description, dueDate, priority);
        const project = findProject(parseInt(projectId));
        project.addTask(task);
        actualizarInfoProyectos();
        UIModule.renderProjectDetail(project);
    }

    function deleteTask(projectId, taskId) {
        const project = findProject(projectId);
        project.deleteTask(taskId);
        actualizarInfoProyectos();
        UIModule.renderProjectDetail(project);
    }

    function finishTask(projectId, taskId) {
        const project = findProject(projectId);
        project.finishTask(taskId);
        actualizarInfoProyectos();
        UIModule.renderProjectDetail(project);
    }

    function actualizarInfoProyectos() {
        localStorage.removeItem('projects');
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return { init, addProject, deleteProject, addTask, deleteTask, finishTask, get projects() { return projects; } };
})();

appController.init();