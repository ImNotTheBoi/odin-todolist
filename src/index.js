import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData, changeData, loadData, getProjectList } from "./storageHandler"

const todayButton = document.querySelector(".today")
const upcomingButton = document.querySelector(".upcoming")
const inboxButton = document.querySelector(".inbox")

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

const body = document.querySelector("body")

let currentProject = ""
let currentTodo = ""

function checkIfNil(x) {
    if (!x && x !== false) {return ""}
    return x
}

function appendProject(project) {
    //* Project Div
    console.log(project)
    const projectDiv = document.createElement("div")
    projectDiv.textContent = project.projectTitle
    projectDiv.classList.add("project")
    project.projectDiv = projectDiv

    //* Todo Button
    const newTodoButton = document.createElement("button")
    newTodoButton.textContent = "New Todo"
    newProjectButton.classList.add("newTodo")
    newTodoButton.addEventListener("click", () => {
        confirmTodo.style.visibility = "hidden"
        currentProject = project
        clearDialogs()
        todosDialog.showModal()
    })
    
    //* Edit Button
    const editProjectButton = document.createElement("button")
    editProjectButton.textContent = "Edit Project"
    editProjectButton.classList.add("editProject")
    editProjectButton.addEventListener("click", () => {
        currentProject = project
        projectNameInput.value = project.projectTitle
        confirmProject.style.visibility = "hidden"
        projectDialog.showModal()
    })

    //* Delete Button
    const deleteProjectButton = document.createElement("button")
    deleteProjectButton.textContent = "Delete Project"
    deleteProjectButton.classList.add("deleteProject")
    deleteProjectButton.addEventListener("click", () => {
        currentProject = project
        deleteProject()
    })

    body.appendChild(projectDiv)
    projectDiv.appendChild(editProjectButton)
    projectDiv.appendChild(deleteProjectButton)
    projectDiv.appendChild(newTodoButton)
}

function appendTodo(todo) {
    if (!todo) {return}

    //* Todo Container
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    todo.todoDiv = todoDiv

    //* Todo Div
    const newDiv = document.createElement("div")
    newDiv.textContent = `${todo.title}, ${todo.description}, ${todo.dueDate.dateStatus}, ${todo.priority}, ${todo.notes}, ${todo.checklist},`
    body.appendChild(newDiv)

    //* Edit Button
    const viewTodoButton = document.createElement("button")
    viewTodoButton.textContent = "Edit Todo"
    viewTodoButton.classList.add("editTodo")
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
    const deleteTodoButton = document.createElement("button")
    deleteTodoButton.textContent = "Delete Todo"
    deleteTodoButton.classList.add("deleteTodo")
    deleteTodoButton.addEventListener("click", () => {
        currentTodo = todo
        deleteTodo()
    })

    console.log(todo)
    const projectDiv = getProjectList()[todo.projectIndex].projectDiv
    projectDiv.appendChild(todoDiv)
    todoDiv.appendChild(newDiv)
    todoDiv.appendChild(viewTodoButton)
    todoDiv.appendChild(deleteTodoButton)
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
        loadProjectButtons()
    }
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
        const projectButton = document.createElement("button")
        projectButton.classList.add("projectButton")
        projectButton.textContent = project.projectTitle
        projectButton.addEventListener("click", (event) => {
            currentTab = project
            loadTab()
        })
        body.appendChild(projectButton)
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