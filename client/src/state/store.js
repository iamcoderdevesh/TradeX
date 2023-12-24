import { configureStore, combineReducers, isRejectedWithValue } from '@reduxjs/toolkit';
import globalSliceReducer from "state/index.js";
import api from "state/api";
import authSliceReducer from './api/auth/authSlice';
import accountSliceReducer from './api/accounts/accountSlice';
import { Toast } from 'components/common/alerts';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    global: globalSliceReducer,
    auth: authSliceReducer,
    account: accountSliceReducer
});

const errorsMiddleware = (dispatch) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const { payload } = action;
        payload.data != null ? Toast.error(payload.data.message)
        : Toast.error('Oops looks like Something went wrong Internal Server Error!!!');
    }

    return next(action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware).concat(errorsMiddleware)
});