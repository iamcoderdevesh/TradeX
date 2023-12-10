import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountInfo: [],
    selectedAccount: undefined,
    selectedCurrency: undefined,
    stats: [],
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
        setSelectedCurrencySymbol: (state, action) => {
            state.selectedCurrency = action.payload;
        },
        addAccountInfo: (state, action) => {
            state.accountInfo = action.payload;
        },
        setStatistics: (state, action) => {
            state.stats = action.payload;
        },
    },
});

export const { setSelectedAccount, addAccountInfo, setSelectedCurrencySymbol, setStatistics } = accountSlice.actions;
export default accountSlice.reducer;
