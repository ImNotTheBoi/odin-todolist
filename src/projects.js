export default class Project {
    todoList = []
    constructor(projectTitle) {
        [this.projectTitle] = [projectTitle]
    }
    
    sortPriority() {
        this.todoList = this.todoList.sort(function(a, b){return b.priority - a.priority})
    }

    addTodos(todo) {
        console.log(todo)
        this.todoList.unshift(todo)
        this.sortPriority()
        return this.todoList.indexOf(todo)
    }

    deleteTodos(index) {
        console.log(index)
        this.todoList.splice(index, 1)
        console.log(this.todoList)
    }
}


