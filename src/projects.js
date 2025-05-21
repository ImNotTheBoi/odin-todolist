import { saveData, deleteData, projectList} from "./storageHandler"

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

    giveIndex() {
        for (let i = 0; i < this.todoList.length; i++) {
            this.todoList[i].indexInList = i
        }
    }

    sortPriority() {
        this.todoList = this.todoList.sort(function(a, b){return b.priority - a.priority})
        this.giveIndex()
        this.setPriorityColor()
    }

    addTodo(todo) {
        this.todoList.unshift(todo)
        this.sortPriority()
    }
    
    removeTodo(index) {
        this.todoList.splice(index, 1)
        this.sortPriority()
    }

    editTodo(todo, index) {
        this.todoList[index] = todo
        this.sortPriority()
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


