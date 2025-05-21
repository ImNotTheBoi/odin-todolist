let projectList = []

const storedProjects = localStorage.getItem('projectList')

function loadData() {
    if (!JSON.parse(storedProjects)) {return}
    projectList = JSON.parse(storedProjects)
    return projectList
}

function getProjectList() {
    return projectList
}

function giveIndex() {
    for (let i = 0; i < projectList.length; i++) {
        projectList[i].indexInList = i
        for (let v = 0; v < projectList[i].todoList.length; v++) {
            projectList[i].todoList[v].projectIndex = i
        }
    }
}

//* For creating projects
function saveData(project) {
    if (!project) {return console.log("data cannot be saved")}
    projectList.push(project)
    giveIndex()
    console.log(projectList)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

//* For creating and editing todos/projects
function changeData(project) {
    const projectIndex = project.indexInList
    projectList[projectIndex] = project
    giveIndex()
    console.log(projectList)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

//* For deleting projects
function deleteData(projectIndex) {
    projectList.splice(projectIndex, 1)
    giveIndex()
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

export {saveData, deleteData, changeData, loadData, getProjectList}