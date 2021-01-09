import { CalendarActionTypes, CalendarState, UPDATE_CALENDAR } from "./types";

const initialState: CalendarState = {
    calendar: []
}

export function calendarReducer(state = initialState, action: CalendarActionTypes): CalendarState {
    switch (action.type) {
        case UPDATE_CALENDAR: {
            return { 
                ...state, 
                ...action.payload
            };
        }

        default:
            return state;
    }
}
