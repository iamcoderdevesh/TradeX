import { configureStore, combineReducers, isRejectedWithValue } from '@reduxjs/toolkit';
import globalReducer from "state/index.js";
import api from "state/api.js";
import authSliceReducer from './auth/authSlice';
import { Toast } from 'components/common/alerts';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    global: globalReducer,
    auth: authSliceReducer
});

const errorsMiddleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const { payload } = action;
        if (payload.data != null) {
            const { code, message } = payload.data;
            Toast.error(message);
        } else {
            Toast.error('Internal Server Error');
        }
    }

    return next(action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).concat(errorsMiddleware)
});