import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData, changeData, loadData, projectList } from "./storageHandler"

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
    // .Todo Button
    const newTodoButton = document.createElement("button")
    newTodoButton.textContent = "New Todo"
    newProjectButton.classList.add = "newTodo"
    newTodoButton.addEventListener("click", () => {
        currentProject = project
        console.log(project)
        todosDialog.showModal()
    })
    body.appendChild(newTodoButton)
    
    // Append Div
    const newDiv = document.createElement("div")
    newDiv.textContent = project.projectTitle
    body.appendChild(newDiv)
}

function appendTodo(todo) {
    console.log(todo)
    if (!todo) {return}
    function checkIfNil(todoEle) {
        if (!todoEle && todoEle !== false) {return}
        return todoEle
    }
    const newDiv = document.createElement("div")
    newDiv.textContent = `${checkIfNil(todo.title)}, ${checkIfNil(todo.description)}, ${checkIfNil(todo.dueDate)}, ${checkIfNil(todo.priority)}, ${checkIfNil(todo.notes)}, ${checkIfNil(todo.checklist)},`
    body.appendChild(newDiv)

    const editTodoButton = document.createElement("button")
    editTodoButton.textContent = "Edit Todo"
    editTodoButton.classList.add = "editTodo"
    editTodoButton.addEventListener("click", () => {
        currentTodo = todo
        console.log(currentTodo)
        titleInput.value = checkIfNil(todo.title)
        descriptionInput.value = checkIfNil(todo.description)
        dueDateInput.value = checkIfNil(todo.dueDate)
        priorityInput.value = checkIfNil(todo.priority)
        notesInput.value = checkIfNil(todo.notes)
        checklistInput.value = checkIfNil(todo.checklist)
        todosDialog.showModal()
    })
    body.appendChild(editTodoButton)
}

function createProject() {
    const newProject = new Project(projectName.value)
    appendProject(newProject)
    saveData(newProject)
    console.log(newProject)
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
    if (currentProject) {
        currentProject.addTodo(newTodo)
        appendTodo(newTodo)
        changeData(currentProject)
        console.log(currentProject)
    }
    else if (currentTodo) {
        editTodo(newTodo)
    }
}

function editTodo(todo) {
    const project = projectList[currentTodo.indexInList]
    console.log(project)
    project.editTodo(todo, currentTodo.indexInList)
    console.log(project)
    changeData(project)
    loadProject(project)
}

function loadProject(project) {
    for (const todo of project.todoList) {
        Object.setPrototypeOf(todo, Object.getPrototypeOf(new Todo()))
        appendTodo(todo)
    }
}

function appendSave(projectList) {
    console.log(projectList)
    if (projectList == []) {return}
    for (const project of projectList) {
        Object.setPrototypeOf(project, Object.getPrototypeOf(new Project()))
        appendProject(project)
        loadProject(project)
    }
}

newProjectButton.addEventListener("click", () => {
    projectDialog.showModal()
})

confirmProject.addEventListener("click", (event) => {
    event.preventDefault()
    createProject()
    projectDialog.close()
})

confirmTodos.addEventListener("click", (event) => {
    event.preventDefault()
    createTodo()
    currentProject = ""
    todosDialog.close()
})
    
loadData()
appendSave(projectList)