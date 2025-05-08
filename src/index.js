import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData, changeData } from "./storageHandler"

// const newProject = new Project("Default")
// const newDueDate = new dueDate("2025-04-14", "14:00:00")
// const newTodo = new Todo("yes", "yes", newDueDate.dateAndTime, "1", "yes", "yes")
// newProject.addTodo(newTodo)

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

function createTodo(title, description, dueDate, priority, notes, checklist) {
    const newTodo = new Todo(title, description, dueDate, priority, notes, checklist)
    currentProject.addTodo(newTodo)
    changeData(currentProject.indexInList, currentProject)
    console.log(currentProject)
}

newProjectButton.addEventListener("click", () => {
    projectDialog.showModal()
})

confirmProject.addEventListener("click", (event) => {
    event.preventDefault()
    const newProject = new Project(projectName.value)
    const newTodoButton = document.createElement("button")
    newTodoButton.textContent = "New Todo"
    newProjectButton.classList.add = "newTodos"
    newTodoButton.addEventListener("click", () => {
        currentProject = newProject
        todosDialog.showModal()
    })
    body.appendChild(newTodoButton)
    saveData(newProject)
    console.log(newProject)
    projectDialog.close()
})

let currentProject = ""
confirmTodos.addEventListener("click", (event) => {
    event.preventDefault()
    createTodo(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value,
        notesInput.value,
        checklistInput.value
    )
    todosDialog.close()
})