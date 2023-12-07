import { body } from 'express-validator';
import UserInfo from "../models/userInfo.js";

//#region Auth Validations
export const registerValidations = [
    body('UserName', 'Enter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('Email').custom(async value => {
        const user = await UserInfo.findOne({Email: value});
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body('UserName').custom(async value => {
        const user = await UserInfo.findOne({UserName: value});
        if (user) {
            throw new Error('Username already in use');
        }
    }),
];

export const loginValidations = [
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];

export const profileValidations = [
    body('Email', 'Enter a valid email').isEmail(),
];
//#endregion

//#region Account Validations
export const accountValidations = [
    body('AccountName', 'Enter a valid account name').isLength({ min: 3 }),
    body('Market', 'Please select market type').isLength({ min: 2 }),
    body('Broker', 'Please select broker').isLength({ min: 2 }),
    body('InitialBalance', 'Enter a valid initial balance').isNumeric().isLength({ min: 1, max: 9 }),
    body('Currency', 'Please select currency').isLength({ min: 2 })
];
//#endregion

//#region Tag Validation
export const tagValidations = [
    body('TagName', 'Enter a valid tag name').isLength({ min: 1 }),
    body('TagType', 'Select a valid tag type').isLength({ min: 3 })
];
//#endregion

//#region Trade Validation
export const tradeValidations = [
    body('Market', 'Please select market type').isLength({ min: 2 }),
    body('Broker', 'Please select broker').isLength({ min: 2 }),
    body('Setup', 'Please select setup').isLength({ min: 2 }),
    body('TradeStatus', 'Please select trade status').isLength({ min: 2 }),
    body('Action', 'Please select broker').isLength({ min: 2 }),
    body('Symbol', 'Enter a valid symbol name').isLength({ min: 2 }),
    body('EntryDate', 'Please select valid entry date').isISO8601(),
    body('ExitDate', 'Please select valid exit date').isISO8601(),
    body('EntryPrice', 'Enter a valid entry price').isNumeric().isLength({ min: 1, max: 9 }),
    body('ExitPrice', 'Enter a valid exit price').isNumeric().isLength({ min: 1, max: 9 }),
    body('StopLoss', 'Enter a valid stop loss').isNumeric().isLength({ min: 1, max: 9 }),
    body('Quantity', 'Enter a valid quantity').isNumeric().isLength({ min: 1, max: 9 }),
    body('AccountId', 'Account not found').isLength({ min: 1 }),
];

export const importValidations = [
    body('Broker', 'Please select valid broker').isLength({ min: 2 }),
    body('AccountName', 'Please select valid account name').isLength({ min: 2 }),
    body('ImportDesc', 'Please enter a valida import description').isLength({ min: 2 }),
    body('AccountId', 'Account not found').isNumeric().isLength({ min: 1, max: 9 })
];
//#endregion