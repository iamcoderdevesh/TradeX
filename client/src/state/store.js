import { configureStore } from '@reduxjs/toolkit'
import defaultReducer from "state";

export const store = configureStore({
    reducer: defaultReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),   
});