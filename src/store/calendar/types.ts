import { IDay } from "../../api/SHoliday/IDaysResponse";

export const UPDATE_CALENDAR = 'UPDATE_CALENDAR';

export interface CalendarState {
    calendar: IDay[];
}

interface UpdateCalendarAction {
    type: typeof UPDATE_CALENDAR;
    payload: CalendarState;
}

export type CalendarActionTypes = UpdateCalendarAction;