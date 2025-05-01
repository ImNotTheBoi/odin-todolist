import "./styles.css";
import Project from "./projects"
import Todos from "./todos"
import dueDate from "./todoDate"

const newProject = new Project("Default")
const newDueDate = new dueDate("2025-04-14", "14:00:00")
const newTodo = new Todos("yes", "yes", newDueDate.dateAndTime, "1", "yes", "yes")
const newTodo2 = new Todos("yes", "yes", newDueDate.dateAndTime, "2", "yes", "yes")
newProject.addTodos(newTodo.todoInfo)
newProject.addTodos(newTodo2.todoInfo)
console.log(newProject) 