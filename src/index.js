import "./styles.css";
import Project from "./projects"
import Todos from "./todos"
import dueDate from "./todoDate"

const newProject = new Project("Default")
const newProject2 = new Project("Project1")
const newDueDate = new dueDate("2025-04-14", "14:00:00")
const newTodo = new Todos("yes", "yes", newDueDate.dateAndTime, "1", "yes", "yes")
const newTodo2 = new Todos("yes", "yes", newDueDate.dateAndTime, "2", "yes", "yes")
newTodo.setProject(newTodo, newProject)
newTodo.setProject(newTodo, newProject2)
newTodo.editInfo("title", "no")
console.log(newProject)
console.log(newProject2)