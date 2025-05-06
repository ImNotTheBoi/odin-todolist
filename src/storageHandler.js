let projectList = []

const storedProjects = localStorage.getItem('projectList')

function loadData() {
    if (projectList == []) {return}
    projectList = JSON.parse(storedProjects)
    console.log(projectList)
}

function saveData(project) {
    projectList.shift(project)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

function deleteData(project) {
    const projectIndex = projectList.indexOf(project)
    projectList.splice(projectIndex, 1)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

loadData()
export {saveData, deleteData}