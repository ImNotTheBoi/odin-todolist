import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"
import { saveData, deleteData } from "./storageHandler"

const newProject = new Project("Default")
const newProject2 = new Project("Project1")
const newDueDate = new dueDate("2025-04-14", "14:00:00")
const newTodo = new Todo("yes", "yes", newDueDate.dateAndTime, "1", "yes", "yes")
newProject.addTodo(newTodo)
console.log(newProject)
console.log(newTodo)

deleteData(0)