import Todos from "./todos"
export default class Project {
    todoList = []
    constructor(projectTitle) {
        [this.projectTitle] = [projectTitle]
    }
    
    sortPriority() {
        this.todoList = this.todoList.sort(function(a, b){return b.priority - a.priority})
    }

    addTodos(obj) {
         this.todoList.unshift(obj)
         this.sortPriority()
    }
}


