import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accountInfo: [],
    selectedAccount: undefined,
    selectedCurrency: undefined,
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
    },
});

export const { setSelectedAccount, addAccountInfo, setSelectedCurrencySymbol } = accountSlice.actions;
export default accountSlice.reducer;
