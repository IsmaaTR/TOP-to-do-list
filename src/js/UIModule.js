export const UIModule = (function () {
    //DOM Elements
    const newProjectButton = document.querySelector('#new-project-container');
    const newProjectModal = document.querySelector('#add-project-modal');
    const newProjectForm = document.querySelector('#project-modal-form');
    const projectsContainer = document.querySelector('#projects-container');
    const projectDetailContainer = document.querySelector('#project-detail-container');

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

    }

    function renderProjectList(projects) {
        projectsContainer.replaceChildren();
        projects.forEach(proyect => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            projectContainer.insertAdjacentHTML("afterbegin",
                `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/>
                </svg>`
            );
            const projectNameParagraph = document.createElement('p');
            projectNameParagraph.textContent = proyect.name;
            projectContainer.appendChild(projectNameParagraph);
            projectsContainer.appendChild(projectContainer);
        });

    }

    function renderProjectTasks(project) {

    }

    return { init, renderProjectList, renderProjectTasks};

})();