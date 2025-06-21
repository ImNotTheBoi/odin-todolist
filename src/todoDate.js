import { formatDistance, compareAsc } from "date-fns";
export default class dueDate {
    constructor(date, time) {
        [this.date, this.time] = [date, time]
    }

    compareDate() {
        return compareAsc(this.dateAndTime, new Date())
    }

    compareDays() {
        const daysLeft = (new Date(this.date).getDay()) - (new Date().getDay())
        return daysLeft
    }

    get dateAndTime() {
        if (!this.time) {return new Date(this.date)}
        const timeArray = (this.time.split(":")).map(x => {return Number(x)})
        const dateArray = (this.date.split("-")).map(x => {return Number(x)})
        return new Date(dateArray[0], (dateArray[1] - 1), dateArray[2], timeArray[0], timeArray[1])
    }

    get dateStatus() {
        console.log(this.compareDate())
        if (!this.date) {return ""}
        if (this.compareDate() === -1) {
            return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " ago"
        }
        if (this.compareDays() === 0) {
            if (this.time) {return "Today, " + this.time}
            else {return "Today"}
        }
        if (this.compareDate() === 1) {
            return formatDistance(this.dateAndTime, new Date(), {includeSeconds: true}) + " left"
        }
    }
}