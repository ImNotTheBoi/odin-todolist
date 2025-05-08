let projectList = []

const storedProjects = localStorage.getItem('projectList')

function loadData() {
    if (!JSON.parse(storedProjects)) {return}
    projectList = JSON.parse(storedProjects)
    console.log(projectList)
}

function giveIndex() {
    for (let i = 0; i < projectList.length; i++) {
        projectList[i].indexInList = i
    }
}

function saveData(project) {
    if (!project) {return console.log("data cannot be saved")}
    projectList.push(project)
    giveIndex()
    console.log(projectList)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

function changeData(projectIndex, project) {
    projectList[projectIndex] = project
    console.log(projectList)
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

function deleteData(projectIndex) {
    projectList.splice(projectIndex, 1)
    giveIndex()
    localStorage.setItem('projectList', JSON.stringify(projectList))
}

loadData()
export {saveData, deleteData, changeData}