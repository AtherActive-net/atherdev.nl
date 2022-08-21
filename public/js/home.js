const baseUrl = window.location.origin;

async function loadProjects() {
    const libraryBox = document.querySelector('#librarybox');
    const projectBox = document.querySelector('#projectbox');
    let projects = await fetchProjectData();
    console.log(projects)
    await renderProjects(libraryBox, await projects.libraries);
    await renderProjects(projectBox, await projects.projects);
}


async function fetchProjectData() {
    let projects;
    const url = baseUrl + '/api/projects.json';
    let data = await fetch(url);
    projects = await data.json();
    return await projects;
}

async function renderProjects(target, projects) {
    const projectTemplate = await fetch(baseUrl+'/components/projectcard.html').then(response => response.text())
    projects.forEach(project => {
        console.log(project)
        let projectCard = parseToHTML(projectTemplate);
        projectCard.querySelector('.project-title').innerHTML = project.title;
        projectCard.querySelector('.project-description').innerHTML = project.description;
        projectCard.querySelector('.project-image').src = project.image;
        projectCard.querySelector('.project-link-text').innerHTML = `${project.link.icon} ${project.link.title}`;
        projectCard.querySelector('.project-link').href = project.link.url;

        target.appendChild(projectCard);
    })
}

function parseToHTML(html) {
    const parser = new DOMParser();
    let data =  parser.parseFromString(html, 'text/html');
    return data.querySelector('.col-3')
}

setTimeout(loadProjects, 10);