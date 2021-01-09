import { combineReducers } from "redux";
import { calendarReducer } from "./calendar/reducers";

export const rootReducer = combineReducers({
    calendar: calendarReducer
})

export type RootState = ReturnType<typeof rootReducer>;