import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: "light",
    isLoading: 0,
    activeSidebar: true,
    fullCalendar_date: "",
    pnlPopup: false,
    filterPopup: false,
    profilePopup: false
}

const setStateMode = (mode) => {
    return mode ? false : true;
}

export const slice = createSlice({
    name: 'default',
    initialState,
    reducers: {
        setMode: (state, action) => {
            const currentMode = action.payload ? action.payload : state.mode === "light" ? "dark" : "light";
            state.mode = currentMode;
            const root = window.document.documentElement;
            root.classList.remove(currentMode === "light" ? "dark" : "light");
            root.classList.add(currentMode);
            localStorage.setItem("themeMode", currentMode);
        },
        setActiveSidebar: (state) => {
            state.activeSidebar = setStateMode(state.activeSidebar);
        },
        handleDateClick: (state, action) => {
            if (state.pnlPopup) {
                state.pnlPopup = false;
            }
            else {
                state.fullCalendar_date = action.payload.date;
                state.pnlPopup = true;
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

export const { setMode, setActiveSidebar, handleDateClick, setFilterPopup, setLoading, setProfilePopup } = slice.actions;

export default slice.reducer;