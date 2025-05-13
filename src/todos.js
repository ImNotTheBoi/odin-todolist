export default class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
        [this.title, this.description, this.dueDate, this.priority, this.notes, this.checklist] = [title, description, dueDate, priority, notes, checklist]
    }

    editInfo(info, value) {
        if (!this[info]) {return console.log("property does not exist")}
        this[info] = value
    }
}