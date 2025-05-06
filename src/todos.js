export default class Todos {
    constructor(title, description, dueDate, priority, notes, checklist) {
        [this.title, this.description, this.dueDate, this.priority, this.notes, this.checklist] = [title, description, dueDate, priority, notes, checklist]
    }
    
    setProject(todo, project) {
        if (this.project) {
            this.project.removeTodos(this.todoIndex)
        }
        this.project = project
        this.todoIndex = project.addTodos(todo)
    }

    editInfo(info, value) {
        if (!this[info]) {return console.log("property does not exist")}
        this[info] = value
    }

    get todoInfo() {
        return {
            title: this.title, 
            description: this.description, 
            dueDate: this.dueDate, 
            priority: this.priority,
            notes: this.notes, 
            checklist: this.checklist,
            project: this.project
        }
    }
}