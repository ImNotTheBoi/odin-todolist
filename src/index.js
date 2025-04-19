import "./styles.css";
import Project from "./projects"
import Todos from "./todos"
import dueDate from "./todoProperties"

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

function formatTodos(title, description, dueDate, priority, notes, checklist) {
    const newTodos = new Todos(title, description, dueDate, priority, notes, checklist)
    currentProject.addTodos(newTodos)
    console.log(currentProject)
}

newProjectButton.addEventListener("click", () => {
    projectDialog.showModal()
})

confirmProject.addEventListener("click", (event) => {
    event.preventDefault()
    const newProject = new Project(projectName.value)
    const newTodosButton = document.createElement("button")
    newTodosButton.textContent = "New Todo"
    newProjectButton.classList.add = "newTodos"
    newTodosButton.addEventListener("click", () => {
        currentProject = newProject
        todosDialog.showModal()
    })
    newProjectButton.appendChild(newTodosButton)
    console.log(newProject)
    projectDialog.close()
})

let currentProject = ""
confirmTodos.addEventListener("click", (event) => {
    event.preventDefault()
    formatTodos(
        titleInput.value,
        descriptionInput.value,
        dueDateInput.value,
        priorityInput.value,
        notesInput.value,
        checklistInput.value
    )
    todosDialog.close()
})