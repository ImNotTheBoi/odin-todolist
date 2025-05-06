import { saveData } from "./storageHandler"

export default class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
        [this.title, this.description, this.dueDate, this.priority, this.notes, this.checklist] = [title, description, dueDate, priority, notes, checklist]
    }
    
    setProject(thisTodo, project) {
        if (this.project) {
            this.project.removeTodos(this.todoIndex, project)
        }
        this.project = project
        this.todoIndex = project.addTodos(thisTodo)
        saveData(this.project)
    }

    editInfo(info, value) {
        if (!this[info]) {return console.log("property does not exist")}
        this[info] = value
        saveData(this.project)
    }

    deleteTodo() {
        this.project.removeTodos(this.todoIndex)
        saveData(this.project)    
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