import { formatDistance, compareAsc, add } from "date-fns";
export default class dueDate {
    constructor(date, time) {
        [this.date, this.time] = [date, time]
    }

    compareDate() {
        return compareAsc(this.dateAndTime, new Date())
    }

    get dateAndTime() {
        const timeArray = this.time.split(":")
        return add(new Date(this.date), {hours: timeArray[0], minutes: timeArray[1], seconds: timeArray[2]})
    }

    get remainingTime() {
        console.log(this.dateAndTime)
        if (this.compareDate === 1) {
            return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " left"
        }
        return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " ago"
    }
}