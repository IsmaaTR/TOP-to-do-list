export const UIModule = (function () {
    //DOM Elements
    const newProjectButton = document.querySelector('#new-project-container');
    const newProjectModal = document.querySelector('#add-project-modal');
    const newProjectForm = document.querySelector('#project-modal-form');
    const projectsContainer = document.querySelector('#projects-container');
    const projectDetailContainer = document.querySelector('#project-detail-container');
    const newTaskModal = document.querySelector('#add-task-modal');
    const newTaskForm = document.querySelector('#task-modal-form');

    function init(appController) {
        addEventListeners(appController);
    }

    function addEventListeners(appController) {
        //Open new project modal
        newProjectButton.addEventListener('click', () => {
            newProjectModal.showModal();
        });

        //Close new project modal
        newProjectModal.addEventListener('click', (event) => {
            if (event.target === newProjectModal) {
                newProjectModal.close();
            }
        });

        //Submit new project modal
        newProjectForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const projectName = document.querySelector('#projectName').value;
            appController.addProject(projectName);
            newProjectForm.reset();
            newProjectModal.close();
        });

        //Close new task modal
        newTaskModal.addEventListener('click', (event) => {
            if (event.target === newTaskModal) {
                newTaskModal.close();
            }
        });

        //Submit new task modal
        newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const projectId = document.querySelector('#add-new-task-button').dataset.id;
            const taskTitle = document.querySelector('#taskTitle').value;
            const taskDescription = document.querySelector('#taskDescription').value;
            const taskPriority = document.querySelector('#taskPriority').value;
            const taskDueDate = document.querySelector('#taskDueDate').value;
            appController.addTask(projectId, taskTitle, taskDescription, taskPriority, taskDueDate);
            newTaskForm.reset();
            newTaskModal.close();
        });
    }

    function renderProjectList(projects) {
        projectsContainer.replaceChildren();
        projects.forEach(project => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            projectContainer.insertAdjacentHTML("afterbegin",
                `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/>
                </svg>`
            );
            const projectNameParagraph = document.createElement('p');
            projectNameParagraph.textContent = project.name;
            projectContainer.appendChild(projectNameParagraph);
            projectContainer.addEventListener('click', () => {
                renderProjectDetail(project);
            });
            projectsContainer.appendChild(projectContainer);
        });

    }

    function renderProjectDetail(project) {
        projectDetailContainer.replaceChildren();

        const projectNameH1 = document.createElement('h1');
        projectNameH1.innerText = project.name;
        projectDetailContainer.appendChild(projectNameH1);
        projectDetailContainer.appendChild(document.createElement('hr'));

        project.tasks.forEach(task => {
            // Crear contenedor principal
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('tarea');

            // Crear el contenedor del radio button
            const checkContainer = document.createElement('div');
            checkContainer.classList.add('task-check-container');
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `finishTask${task.id}`;
            radioInput.id = `finishTask${task.id}`;
            checkContainer.appendChild(radioInput);

            // Crear el contenedor del título y botón
            const titleContainer = document.createElement('div');
            titleContainer.classList.add('task-title-container');
            const taskTitle = document.createElement('p');
            taskTitle.textContent = task.title;
            const deleteButton = document.createElement('button');

            // Insertar SVG en el botón
            deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                </svg>
            `;
            titleContainer.appendChild(taskTitle);
            titleContainer.appendChild(deleteButton);

            // Crear el contenedor de la fecha
            const dateContainer = document.createElement('div');
            dateContainer.classList.add('task-date-container');
            const dateText = document.createElement('p');
            dateText.textContent = task.dueDate;
            dateContainer.appendChild(dateText);

            // Agregar elementos al contenedor principal
            taskDiv.appendChild(checkContainer);
            taskDiv.appendChild(titleContainer);
            taskDiv.appendChild(dateContainer);

            projectDetailContainer.appendChild(taskDiv);
        });

        const newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('new-task');
        const newTaskButton = document.createElement('button');
        newTaskButton.innerText = '+';
        newTaskButton.id = 'add-new-task-button';
        newTaskButton.dataset.id = project.id;
        newTaskButton.addEventListener('click', () => {
            newTaskModal.showModal();
        })
        const newTaskPar = document.createElement('p');
        newTaskPar.innerText = 'Create new task';
        newTaskDiv.appendChild(newTaskButton);
        newTaskDiv.appendChild(newTaskPar);
        projectDetailContainer.appendChild(newTaskDiv);
    }

    return { init, renderProjectList, renderProjectDetail};

})();