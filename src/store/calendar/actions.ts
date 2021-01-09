import { CalendarActionTypes, CalendarState, UPDATE_CALENDAR } from "./types";

export function updateCalendar(newCalendar: CalendarState): CalendarActionTypes {
    return {
        type: UPDATE_CALENDAR,
        payload: newCalendar
    }
}