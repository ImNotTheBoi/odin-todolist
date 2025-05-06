import "./styles.css";
import Project from "./projects"
import Todo from "./todos"
import dueDate from "./todoDate"

const newProject = new Project("Default")
const newProject2 = new Project("Project1")
const newDueDate = new dueDate("2025-04-14", "14:00:00")
const newTodo = new Todo("yes", "yes", newDueDate.dateAndTime, "1", "yes", "yes")
const newTodo2 = new Todo("yes", "yes", newDueDate.dateAndTime, "2", "yes", "yes")
newTodo.setProject(newTodo, newProject)
newTodo.setProject(newTodo, newProject2)
newTodo.deleteTodo(newTodo)
console.log(newProject)
console.log(newProject2)
console.log(newTodo)