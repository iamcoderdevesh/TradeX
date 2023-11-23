import { configureStore, combineReducers } from '@reduxjs/toolkit';
import globalReducer from "state/index.js";
import api from "state/api.js";

const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]: api.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});