import moment from "moment";

export const isSameDate = (a: Date, b: Date): boolean => {
    let first = moment(a);
    let second = moment(b);

    return first.year() === second.year()
        && first.month() === second.month()
        && first.date() === second.date();
}

export const isDayBeforeYesterday = (date: Date): boolean => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 2);
    return isSameDate(date, tomorrow);
}

export const isYesterday = (date: Date): boolean => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    return isSameDate(date, tomorrow);
}

export const isToday = (date: Date): boolean => {
    return isSameDate(new Date(), date);
}

export const isTomorrow = (date: Date): boolean => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDate(date, tomorrow);
}

export const isDayAfterTomorrow = (date: Date): boolean => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return isSameDate(date, tomorrow);
}

export const isSameYear = (a: Date, b: Date): boolean => {
    let first = moment(a);
    let second = moment(b);
    return first.year() === second.year();
}
