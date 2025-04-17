export default class Project {
    todoList = []
    constructor(projectTitle) {
        [this.projectTitle] = [projectTitle]
    }
    
    addTodos(obj) {
         this.todoList.unshift(obj)
    }
}
