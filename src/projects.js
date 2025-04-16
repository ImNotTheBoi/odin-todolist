class Project {
    todoList = []
    constructor(projectTitle) {
        [this.projectTitle] = [projectTitle]
    }
    
    addTodos(obj) {
         this.todoList.unshift(obj)
    }
}

class Todos {
    constructor(title, description, dueDate, priority, notes, checklist) {
        [this.title, this.description, this.dueDate, this.priority, this.notes, this.checklist] = [title, description, dueDate, priority, notes, checklist]
    }

    get todoInfo() {
        return {
            title: this.title, 
            description: this.description, 
            dueDate: this.dueDate, 
            priority: this.priority,
            notes: this.notes, 
            checklist: this.checklist
        }
    }
}

const newProject = new Project("Default")
const newTodo = new Todos("yes", "yes", "yes", "yes", "yes", "yes")
newProject.addTodos(newTodo.todoInfo)
console.log(newProject)