import { saveData, deleteData } from "./storageHandler"

export default class Project {
    todoList = []
    indexInList = null
    constructor(projectTitle) {
        [this.projectTitle] = [projectTitle]
    }
    
    priorityColors = ["#ff7f7e", "#ffbf7f", "#ffdf80"]
    setPriorityColor() {
        this.todoList.map(elem => {
            if (elem.priority) {
                elem.priorityColor = this.priorityColors[(elem.priority - 1)]
            }
        })
    }

    sortPriority() {
        this.todoList = this.todoList.sort(function(a, b){return b.priority - a.priority})
        this.setPriorityColor()
    }

    addTodo(todo) {
        this.todoList.unshift(todo)
        this.sortPriority()
    }
    
    removeTodo(todo) {
        index = this.todoList.indexOf(todo)
        this.todoList.splice(index, 1)
    }

    moveTodo(todo, project) {
        this.removeTodo(todo)
        project.addTodo(todo)
        saveData(project)
    }

    deleteProject() {
        deleteData(this.indexInList)      
    }
}


