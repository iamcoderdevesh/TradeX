import React, { useEffect } from 'react';
import { SubmitButton, ResetButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';
import Dropdown from 'components/common/dropdown';
import { useFormik } from "formik";
import { useCreateUpadateAccountMutation, useGetAccountDetailsQuery } from 'state/api/accounts/accountApi';
import { AccountSchema } from 'helpers/validation';
import { useLocation } from 'react-router-dom';

const AccountForm = ({ setShowAccountPage }) => {

    const AccountId = new URLSearchParams(useLocation().search).get('accountId');
    const { data: AccountInfo, isLoading: isLoadingAcc } = useGetAccountDetailsQuery(AccountId, {
        skip: !AccountId,
    });
    const initialValues = AccountInfo
        ? { ...AccountInfo }
        : {
            AccountName: '',
            Market: '',
            Broker: '',
            InitialBalance: '',
            Currency: ''
        };

    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, setValues } = useFormik({
        initialValues,
        validationSchema: AccountSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    const [createUpdateAccount, { isSuccess, data }] = useCreateUpadateAccountMutation();

    useEffect(() => {
        //Dynamically Setting the Values of form for Update/Edit Operation of account.
        AccountInfo && setValues(initialValues);
        
        isSuccess && setShowAccountPage(false);
    }, [isSuccess, data, AccountInfo, isLoadingAcc, setValues]);


    const submitForm = async (formData) => {
        try {
            if (AccountId) formData.AccountId = AccountId;
            await createUpdateAccount(formData).unwrap();
        } catch (error) {
            return;
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className='w-full sm:col-span-2'>
                    <InputField label={"Account Name"} placeholder={"Ex.: Crpyto (Binance)"} id={"account-name"} type={"text"} htmlName={"AccountName"} value={values.AccountName} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.AccountName && touched.AccountName && errors.AccountName} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Market"} id={"ddMarket"} htmlName={"Market"} errorMsg={errors.Market && touched.Market && errors.Market} onChange={handleChange} onBlur={handleBlur} value={values.Market}
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
                    <Dropdown label={"Select Broker"} id={"ddBroker"} htmlName={"Broker"} errorMsg={errors.Broker && touched.Broker && errors.Broker} onChange={handleChange} onBlur={handleBlur} value={values.Broker}
                        children={
                            <>
                                <option>Select Broker</option>
                                <option>ZERODHA</option>
                                <option>ANGLE ONE</option>
                                <option>UPSTOX</option>
                                <option>DHAN</option>
                            </>
                        } />
                </div>
                <div className="w-full">
                    <InputField label={"Initial Balance"} placeholder={"Ex.: $10,000"} id={"initial-balance"} type={"number"} htmlName={"InitialBalance"} value={values.InitialBalance} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.InitialBalance && touched.InitialBalance && errors.InitialBalance} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Currency"} id={"ddCurrency"} htmlName={"Currency"} errorMsg={errors.Currency && touched.Currency && errors.Currency} onChange={handleChange} onBlur={handleBlur} value={values.Currency}
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
                    <SubmitButton id="importTrade" disabled={isSubmitting}>Submit</SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default AccountForm;
