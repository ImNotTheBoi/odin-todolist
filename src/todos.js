export default class Todo {
    constructor(title, description, dueDate, priority, notes) {
        [this.title, this.description, this.dueDate, this.priority, this.notes] = [title, description, dueDate, priority, notes]
    }

    editInfo(info, value) {
        if (!this[info]) {return console.log("property does not exist")}
        this[info] = value
    }
}