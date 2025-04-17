import { formatDistance, compareAsc, add } from "date-fns";
class dueDate {
    constructor(date, time) {
        [this.date, this.time] = [date, time]
    }

    get dateAndTime() {
        const timeArray = this.time.split(":")
        return add(new Date(this.date), {hours: timeArray[0], minutes: timeArray[1], seconds: timeArray[2]})
    }

    get remainingTime() {
        console.log(this.dateAndTime)
        const compareDate = compareAsc(this.dateAndTime, new Date())
        if (compareDate === 1) {
            return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " left"
        }
        return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " ago"
    }
}
const newDueDate = new dueDate("2025-04-19", "14:00:00")
console.log(newDueDate.remainingTime)