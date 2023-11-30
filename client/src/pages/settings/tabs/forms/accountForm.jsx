import React, { useEffect } from 'react';
import { SubmitButton, ResetButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';
import Dropdown from 'components/common/dropdown';
import { useFormik } from "formik";
import { useSelector } from 'react-redux';
import { Toast } from 'components/common/alerts';
import { useCreateUpadateAccountMutation } from 'state/api/accounts/accountApi';
import { AccountSchema } from 'helpers/validation';

const AccountForm = () => {

    const accountInfo = useSelector((state) => state.auth.accountInfo, []);
    const { AccountName, Market, Broker, InitialBalance, Currency } = accountInfo || {};

    const { values, errors, touched, isValid, dirty, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            AccountName: AccountName,
            Market: Market,
            Broker: Broker,
            InitialBalance: InitialBalance,
            Currency: Currency
        },
        validationSchema: AccountSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    const [createUpdateAccount, { isLoading, isSuccess, data }] = useCreateUpadateAccountMutation();

    useEffect(() => {
        if (isSuccess) {
            Toast.success(data.message);
        }
    }, [isSuccess, data]);


    const submitForm = async (formData) => {
        try {
            await createUpdateAccount(formData).unwrap();
        } catch (error) {
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className='w-full sm:col-span-2'>
                    <InputField label={"Account Name"} placeholder={"Ex.: Crpyto (Binance)"} id={"account-name"} type={"text"} htmlName={"AccountName"} value={values.AccountName} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.AccountName || touched.AccountName} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Market"} id={"ddMarket"} htmlName={"Market"} errorMsg={errors.Market || touched.Market} onChange={handleChange} onBlur={handleBlur} value={values.Market}
                        children={
                            <>
                                <option>Select Market</option>
                                <option>STOCKS</option>
                                <option>FOREX</option>
                                <option>CRYPTO</option>
                            </>
                        } />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Broker"} id={"ddBroker"} htmlName={"Broker"} errorMsg={errors.Broker || touched.Broker} onChange={handleChange} onBlur={handleBlur} value={values.Broker}
                        children={
                            <>
                                <option>Select Broker</option>
                                <option>Binance</option>
                            </>
                        } />
                </div>
                <div className="w-full">
                    <InputField label={"Initial Balance"} placeholder={"Ex.: $10,000"} id={"initial-balance"} type={"number"} htmlName={"InitialBalance"} value={values.InitialBalance} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.InitialBalance || touched.InitialBalance} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Currency"} id={"ddCurrency"} htmlName={"Currency"} errorMsg={errors.Currency || touched.Currency} onChange={handleChange} onBlur={handleBlur} value={values.Currency}
                        children={
                            <>
                                <option>Select Currency</option>
                                <option>₹ (INR)</option>
                                <option>$ (US DOLLAR)</option>
                            </>
                        } />
                </div>
                <div className="flex flex-row items-center mt-5">
                    <ResetButton id="reset">Reset</ResetButton>
                    <SubmitButton id="importTrade" disabled={!(dirty && isValid) || isLoading}>Submit</SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default AccountForm;
