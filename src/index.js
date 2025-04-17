import "./styles.css";
import Project from "./projects"
import Todos from "./todos"
import dueDate from "./todoProperties"

const newProject = new Project("Default")
const newDueDate = new dueDate("2025-04-14", "14:00:00")
const newTodo = new Todos("yes", "yes", newDueDate.dateAndTime, "yes", "yes", "yes")
newProject.addTodos(newTodo.todoInfo)
console.log(newProject) 