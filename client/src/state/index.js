import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: "light",
    isLoading: 0,
    activeSidebar: true,
    fullCalendar_date: "",
    showPopup: false,
    filterPopup: false,
    profilePopup: false,
}

const setStateMode = (mode) => {
    return mode ? false : true;
}

export const slice = createSlice({
    name: 'default',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setActiveSidebar: (state) => {
            state.activeSidebar = setStateMode(state.activeSidebar);
        },
        handleDateClick: (state, action) => {
            if (state.showPopup) {
                state.showPopup = false;
            }
            else {
                state.fullCalendar_date = action.payload.date;
                state.showPopup = true;
            }
        },
        setFilterPopup: (state) => {
            state.filterPopup = setStateMode(state.filterPopup);
        },
        setProfilePopup: (state) => {
            state.profilePopup = setStateMode(state.profilePopup);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

export const { setMode, setActiveSidebar, handleDateClick, showPopup, setFilterPopup, setLoading, setProfilePopup } = slice.actions;

export default slice.reducer;