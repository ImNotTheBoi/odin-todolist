import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData, changeData, loadData, getProjectList } from "./storageHandler"

const todayButton = document.querySelector(".today")
const upcomingButton = document.querySelector(".upcoming")
const inboxButton = document.querySelector(".inbox")
const projectTabs = document.querySelector(".projectTabs")
const catImg = document.querySelector(".catImg")

const projectDialog = document.querySelector(".projectDialog")
const newProjectButton = document.querySelector(".newProject")
const projectNameInput = document.querySelector("#projectName")
const confirmProject = document.querySelector("#confirmProject")
const todosDialog = document.querySelector(".todosDialog")
const confirmTodo = document.querySelector("#confirmTodo")

const titleInput = document.querySelector("#title")
const descriptionInput = document.querySelector("#description")
const dueDateInput = document.querySelector("#dueDate")
const timeInput = document.querySelector("#time")
const priorityInput = document.querySelector("#priority")
const notesInput = document.querySelector("#notes")
const checklistInput = document.querySelector("#checklist")
const inputs = [projectNameInput, titleInput, descriptionInput, dueDateInput, timeInput, priorityInput, notesInput, checklistInput]

const projectDiv = document.querySelector(".project")
const todoDiv = document.querySelector(".todo")
const content = document.querySelector(".content")

let currentProject = ""
let currentTodo = ""

function checkIfNil(x) {
    if (!x && x !== false) {return ""}
    return x
}

function appendProject(project) {
    //* Project Div
    console.log(project)
    const projectClone = projectDiv.cloneNode(true)
    const projectTitle = projectClone.querySelector(".projectTitle")
    projectClone.style.display = "block"
    projectTitle.textContent = project.projectTitle
    project.projectDiv = projectClone

    //* Todo Button
    const newTodoButton = projectClone.querySelector(".newTodo")
    newTodoButton.addEventListener("click", () => {
        confirmTodo.style.visibility = "hidden"
        currentProject = project
        clearDialogs()
        todosDialog.showModal()
    })
    
    //* Edit Button
    const editProjectButton = projectClone.querySelector(".editProject")
    editProjectButton.addEventListener("click", () => {
        currentProject = project
        projectNameInput.value = project.projectTitle
        confirmProject.style.visibility = "hidden"
        projectDialog.showModal()
    })

    //* Delete Button
    const deleteProjectButton = projectClone.querySelector(".deleteProject")
    deleteProjectButton.classList.add("deleteProject")
    deleteProjectButton.addEventListener("click", () => {
        currentProject = project
        deleteProject()
    })

    content.appendChild(projectClone)
}

function appendTodo(todo) {
    if (!todo) {return}

    //* Todo Container
    const todoClone = todoDiv.cloneNode(true)
    todoClone.style.display = "flex"
    todo.todoDiv = todoDiv

    //* Todo Div
    const title = todoClone.querySelector(".title")
    const description = todoClone.querySelector(".description")
    const dueDate = todoClone.querySelector(".dueDate")
    title.textContent = todo.title
    description.textContent = todo.description
    dueDate.textContent = todo.dueDate.dateStatus

    //* Edit Button
    const viewTodoButton = todoClone.querySelector(".editTodo")
    viewTodoButton.addEventListener("click", () => {
        currentTodo = todo
        titleInput.value = todo.title
        descriptionInput.value = todo.description
        dueDateInput.value = todo.dueDate.date
        timeInput.value = todo.dueDate.time
        priorityInput.value = todo.priority
        notesInput.value = todo.notes
        checklistInput.value = todo.checklist
        confirmTodo.style.visibility = "hidden"
        todosDialog.showModal()
    })

    //* Delete Button
    const deleteTodoButton = todoClone.querySelector(".deleteTodo")
    deleteTodoButton.addEventListener("click", () => {
        currentTodo = todo
        deleteTodo()
    })

    console.log(todo)
    const projectDiv = getProjectList()[todo.projectIndex].projectDiv
    const todoList = projectDiv.querySelector(".todoList")
    todoList.appendChild(todoClone)
}

function createProject() {
    //* Edits Project
    if (currentProject) {
        const newProject = getProjectList()[currentProject.indexInList].projectTitle = projectNameInput.value
        changeData(newProject)
        currentProject = ""
    }
    //* Creates Project
    else {
        const newProject = new Project(checkIfNil(projectNameInput.value))
        saveData(newProject)
        currentTab = newProject
    }
    loadProjectButtons()
    loadTab()
}

function deleteProject() {
    deleteData(currentProject.indexInList)
    currentTab = "Inbox"
    loadTab()
    loadProjectButtons()
    currentProject = ""
}

function createTodo() {
    const newTodo = new Todo(
        checkIfNil(titleInput.value),
        checkIfNil(descriptionInput.value),
        new dueDate(checkIfNil(dueDateInput.value), checkIfNil(timeInput.value)),
        checkIfNil(priorityInput.value),
        checkIfNil(notesInput.value),
        checkIfNil(checklistInput.value)
    )
    //* = Create Todo
    if (currentProject) {
        currentProject.addTodo(newTodo)
        changeData(currentProject)
        currentProject = ""
    }
    //* = Edit Todo
    else if (currentTodo) {
        const project = getProjectList()[currentTodo.projectIndex]
        project.editTodo(newTodo, currentTodo.indexInList)
        changeData(currentProject)
        currentTodo = ""
    }
    //* Saves Todo
    loadTab()
}

function deleteTodo() {
    const project = getProjectList()[currentTodo.projectIndex]
    project.removeTodo(currentTodo.indexInList)
    changeData(project)
    currentTodo = ""
    loadTab()
}

function deleteDivs() {
    const projectDivs = document.querySelectorAll(".project")
    projectDivs.forEach(project => {
        project.remove()
    });
}

function deleteProjectButtons() {
    const projectButtons = document.querySelectorAll(".projectButton")
    projectButtons.forEach(project => {
        project.remove()
    });
}

function loadProject(project) {
    Object.setPrototypeOf(project, Object.getPrototypeOf(new Project()))
    appendProject(project)
}

function loadTodo(todo) {
    Object.setPrototypeOf(todo, Object.getPrototypeOf(new Todo()))
    Object.setPrototypeOf(todo.dueDate, Object.getPrototypeOf(new dueDate()))
    appendTodo(todo)
}

function loadTab() {
    deleteDivs()
    if (currentTab === "Inbox") {loadInbox()}
    else if (currentTab === "Today") {loadToday()}
    else if (currentTab === "Upcoming") {loadUpcoming()}
    else {loadProjectTab(currentTab)}
}

function loadToday() {
    if (getProjectList() == []) {return}
    for (const project of getProjectList()) {
        let projectAppended = false
        for (const todo of project.todoList) {
            Object.setPrototypeOf(todo.dueDate, Object.getPrototypeOf(new dueDate()))
            if (todo.dueDate.dateStatus && todo.dueDate.dateStatus.includes("Today")) {
                if (!projectAppended) {
                    projectAppended = true
                    loadProject(project)
                    loadTodo(todo)
                }
                else {loadTodo(todo)}
            }
        }
    }
}

function loadUpcoming() {
    if (getProjectList() == []) {return}
    for (const project of getProjectList()) {
        let projectAppended = false
        for (const todo of project.todoList) {
            Object.setPrototypeOf(todo.dueDate, Object.getPrototypeOf(new dueDate()))
            if (todo.dueDate.dateStatus && todo.dueDate.dateStatus.includes("left")) {
                if (!projectAppended) {
                    projectAppended = true
                    loadProject(project)
                    loadTodo(todo)
                }
                else {loadTodo(todo)}
            }
        }
    }
}

function loadInbox() {
    if (getProjectList() == []) {return}
    if (getProjectList() == []) {return}
    for (const project of getProjectList()) {
        let projectAppended = false
        for (const todo of project.todoList) {
            Object.setPrototypeOf(todo.dueDate, Object.getPrototypeOf(new dueDate()))
            if (todo.dueDate.dateStatus && todo.dueDate.dateStatus.includes("ago")) {
                if (!projectAppended) {
                    projectAppended = true
                    loadProject(project)
                    loadTodo(todo)
                }
                else {loadTodo(todo)}
            }
        }
    }
}

function loadProjectTab(project) {
    loadProject(project)
    for (const todo of project.todoList) {
        Object.setPrototypeOf(todo, Object.getPrototypeOf(new Todo()))
        Object.setPrototypeOf(todo.dueDate, Object.getPrototypeOf(new dueDate()))
        loadTodo(todo)
    }
}
function loadProjectButtons() {
    deleteProjectButtons()
    if (getProjectList() == []) {return}
    for (const project of getProjectList()) {
        loadProject(project)
        const projectText = document.createTextNode(project.projectTitle)
        const imgClone = catImg.cloneNode()
        imgClone.style.display = "block"
        const projectButton = document.createElement("button")
        projectButton.classList.add("projectButton")
        projectButton.appendChild(imgClone)
        projectButton.appendChild(projectText)
        projectButton.addEventListener("click", (event) => {
            currentTab = project
            loadTab()
        })
        projectTabs.appendChild(projectButton)
    }
}

function clearDialogs() {
    projectNameInput.value =
    titleInput.value =
    descriptionInput.value =
    dueDateInput.value =
    timeInput.value =
    priorityInput.value =
    notesInput.value =
    checklistInput.value = ""
}

function inputListeners() {
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            confirmProject.style.visibility = "visible"
            confirmTodo.style.visibility = "visible"
        })
    });
}

todayButton.addEventListener("click", () => {
    currentTab = "Today"
    loadTab()
})

upcomingButton.addEventListener("click", () => {
    currentTab = "Upcoming"
    loadTab()
})

inboxButton.addEventListener("click", () => {
    currentTab = "Inbox"
    loadTab()
})

inputListeners()
newProjectButton.addEventListener("click", () => {
    confirmProject.style.visibility = "hidden"
    clearDialogs()
    projectDialog.showModal()
})

confirmProject.addEventListener("click", (event) => {
    event.preventDefault()
    createProject()

    clearDialogs()
    projectDialog.close()
})

confirmTodo.addEventListener("click", (event) => {
    event.preventDefault()
    createTodo()
    clearDialogs()
    todosDialog.close()
})

let currentTab = "Inbox"
loadData()
loadProjectButtons()
loadTab()