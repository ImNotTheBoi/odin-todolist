import { saveData, deleteData } from "./storageHandler"

export default class Project {
    todoList = []
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

    addTodos(todo) {
        console.log(todo)
        this.todoList.unshift(todo)
        this.sortPriority()
        return this.todoList.indexOf(todo)
    }

    removeTodos(index) {
        this.todoList.splice(index, 1)
        console.log(this.todoList)

    }

    deleteProject(thisProject) {
        deleteData(thisProject)
    }
}


