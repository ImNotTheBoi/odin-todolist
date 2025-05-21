import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData, changeData, loadData, getProjectList } from "./storageHandler"

const projectDialog = document.querySelector(".projectDialog")
const newProjectButton = document.querySelector(".newProject")
const projectName = document.querySelector("#projectName")
const confirmProject = document.querySelector("#confirmProject")
const todosDialog = document.querySelector(".todosDialog")
const confirmTodos = document.querySelector("#confirmTodos")

const titleInput = document.querySelector("#title")
const descriptionInput = document.querySelector("#description")
const dueDateInput = document.querySelector("#dueDate")
const priorityInput = document.querySelector("#priority")
const notesInput = document.querySelector("#notes")
const checklistInput = document.querySelector("#checklist")

const body = document.querySelector("body")

let currentProject = ""
let currentTodo = ""

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
    newProjectButton.classList.add = "newTodo"
    newTodoButton.addEventListener("click", () => {
        currentProject = project
        todosDialog.showModal()
    })
    
    const editProjectButton = document.createElement("button")
    editProjectButton.textContent = "Edit Project"
    editProjectButton.classList.add = "editProject"
    editProjectButton.addEventListener("click", () => {
        currentProject = project
        projectName.value = project.projectTitle
        projectDialog.showModal()
    })

    body.appendChild(projectDiv)
    projectDiv.appendChild(editProjectButton)
    projectDiv.appendChild(newTodoButton)
}

function appendTodo(todo) {
    if (!todo) {return}
    function checkIfNil(todoEle) {
        if (!todoEle && todoEle !== false) {return}
        return todoEle
    }

    //* Todo Container
    const todoDiv = document.createElement("div")
    todoDiv.classList.add = "todo"
    todo.todoDiv = todoDiv

    //* Todo Div
    const newDiv = document.createElement("div")
    newDiv.textContent = `${checkIfNil(todo.title)}, ${checkIfNil(todo.description)}, ${checkIfNil(todo.dueDate)}, ${checkIfNil(todo.priority)}, ${checkIfNil(todo.notes)}, ${checkIfNil(todo.checklist)},`
    body.appendChild(newDiv)

    //* Edit Button
    const editTodoButton = document.createElement("button")
    editTodoButton.textContent = "Edit Todo"
    editTodoButton.classList.add = "editTodo"
    editTodoButton.addEventListener("click", () => {
        currentTodo = todo
        titleInput.value = checkIfNil(todo.title)
        descriptionInput.value = checkIfNil(todo.description)
        dueDateInput.value = checkIfNil(todo.dueDate)
        priorityInput.value = checkIfNil(todo.priority)
        notesInput.value = checkIfNil(todo.notes)
        checklistInput.value = checkIfNil(todo.checklist)
        todosDialog.showModal()
    })

    console.log(todo)
    const projectDiv = getProjectList()[todo.projectIndex].projectDiv
    projectDiv.appendChild(todoDiv)
    todoDiv.appendChild(newDiv)
    todoDiv.appendChild(editTodoButton)
}

function createProject() {
    if (currentProject) {
        const newProject = getProjectList()[currentProject.indexInList].projectTitle = projectName.value
        changeData(newProject)
        currentProject = ""
    }
    else {
        const newProject = new Project(projectName.value)
        saveData(newProject)
    }
    appendSave(getProjectList())
}

function createTodo() {
    const newTodo = new Todo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value,
        notesInput.value,
        checklistInput.value
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
    appendSave(getProjectList())
}

function deleteDivs() {
    const projectDivs = document.querySelectorAll(".project")
    projectDivs.forEach(project => {
        project.remove()
    });
}

function appendSave(projectList) {
    console.log(projectList)
    deleteDivs()
    if (projectList == []) {return}
    for (const project of projectList) {
        Object.setPrototypeOf(project, Object.getPrototypeOf(new Project()))
        appendProject(project)
        for (const todo of project.todoList) {
            Object.setPrototypeOf(todo, Object.getPrototypeOf(new Todo()))
            appendTodo(todo)
        }
    }
}

function clearDialogs() {
    projectName.value = ""
    titleInput.value = ""
    descriptionInput.value = ""
    dueDateInput.value = ""
    priorityInput.value = ""
    notesInput.value = ""
    checklistInput.value = ""
}

newProjectButton.addEventListener("click", () => {
    projectDialog.showModal()
})

confirmProject.addEventListener("click", (event) => {
    event.preventDefault()
    createProject()
    clearDialogs()
    projectDialog.close()
})

confirmTodos.addEventListener("click", (event) => {
    event.preventDefault()
    createTodo()
    clearDialogs()
    todosDialog.close()
})

loadData()
appendSave(getProjectList())