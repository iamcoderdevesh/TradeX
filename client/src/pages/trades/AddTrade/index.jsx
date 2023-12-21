import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import InputField from 'components/common/inputs/InputField';
import Dropdown from 'components/common/dropdown';
import { SubmitButton, ResetButton } from 'components/common/buttons';
import { Inputs } from "./variables/FormVariables";
import { TradeSchema } from 'helpers/validation';
import { useFormik } from "formik";
import { AccountDropdown } from 'components/common/dropdown/accountDropdown';
import { useAddUpadateTradeMutation, useGetTradeDetailsQuery } from 'state/api/trade/tradeApi';
import { formatDate } from 'utils';

const AddTrade = () => {

    const tradeId = new URLSearchParams(useLocation().search).get('id');

    const { data: TradeInfo, isLoading: isLoadingTrade } = useGetTradeDetailsQuery(tradeId, {
        skip: !tradeId,
    });

    const initialValues = TradeInfo
        ? { ...TradeInfo }
        : { Account: '', Market: '', Broker: '', Setup: '', TradeStatus: 'Closed', Action: 'Buy', Symbol: '', EntryDate: '', ExitDate: '', EntryPrice: '', ExitPrice: '', StopLoss: '', Quantity: '', EntryReason: '', ExitReason: '', Emotions: '', MarketConditions: '', AdditionalInformation: '' };

    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, setValues } = useFormik({
        initialValues,
        validationSchema: TradeSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    const [addUpdateTrade, { isLoading }] = useAddUpadateTradeMutation();

    useEffect(() => {
        //Dynamically Setting the Values of form for Update Operation of Trade.
        TradeInfo && setValues(initialValues);

    }, [TradeInfo, isLoadingTrade]);


    const submitForm = async (formData) => {
        try {
            if (tradeId) formData.TradeId = parseInt(tradeId);
            formData.AccountId = parseInt(formData.Account);
            delete formData.Account;
            await addUpdateTrade(formData).unwrap();
        } catch (error) {
            return;
        }
    }
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
                <section>
                    <div className="py-8 px-1 max-w-2xl lg:py-2">
                        <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Trade Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div>
                                    <AccountDropdown label={'Account'} htmlName={"Account"} errorMsg={errors.Account && touched.Account && errors.Account} onChange={handleChange} onBlur={handleBlur} value={values.Account} />
                                </div>
                                {/* Below Code is displaying mutiple form elements using javascript object */}
                                {Inputs.FormDropdown.map((items) => (
                                    <div key={items.id}>
                                        <Dropdown label={items.label} id={items.id} htmlName={items.id} errorMsg={errors[items.id] && touched[items.id] && errors[items.id]} onChange={handleChange} onBlur={handleBlur} value={values[items.id]}
                                            children={
                                                items.children.map((child) => (
                                                    <option key={child}>{child}</option>
                                                ))
                                            } />
                                    </div>
                                ))}
                                {Inputs.FormInputs.map((items) => (
                                    <div key={items.id} className={items.divClass}>
                                        <InputField label={items.label} divClass={items.divClass} placeholder={items.placeholder} id={items.id} type={items.type} htmlName={items.id} errorMsg={errors[items.id] && touched[items.id] && errors[items.id]} handleChange={handleChange} onBlur={handleBlur} value={items.id.includes("Date") && values[items.id] ? formatDate(values[items.id], "date-time") : values[items.id]} />
                                    </div>
                                ))}
                                {
                                    showAdd &&
                                    <div className="sm:col-span-2">
                                        <h2 className="pb-4 col-span-2 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Additional Details</h2>
                                    </div>
                                }

                                {showAdd && Inputs.FormAddInputs.map((items) => (
                                    items.id === "null" ?
                                        Inputs.FormAddDropdown.map((dropdown) => (
                                            <div key={dropdown.id}>
                                                <Dropdown label={dropdown.label} id={dropdown.id} htmlName={items.id} errorMsg={errors[items.id] && touched[items.id] && errors[items.id]} onChange={handleChange} onBlur={handleBlur} value={values[items.id]}
                                                    children={
                                                        dropdown.children.map((child) => (
                                                            <option key={child}>{child}</option>
                                                        ))
                                                    } />
                                            </div>
                                        )) :
                                        <div key={items.id} className={items.divClass}>
                                            <InputField label={items.label} divClass={items.divClass} placeholder={items.placeholder} id={items.id} type={items.type} htmlName={items.id} errorMsg={errors[items.id] && touched[items.id] && errors[items.id]} handleChange={handleChange} onBlur={handleBlur} value={values[items.id]} />
                                        </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-center justify-center my-4 sm:my-8">
                                <button type='button' onClick={() => setShowAdd(!showAdd)} className="flex flex-col items-center justify-center">
                                    {showAdd && <BiChevronUp className="dark:text-white cursor-pointer" />}
                                    <h3 className="text-base dark:text-white cursor-pointer">{showAdd ? "Less" : "More"}</h3>
                                    {!showAdd && <BiChevronDown className="dark:text-white cursor-pointer" />}
                                </button>
                            </div>

                            <div className="flex flex-row items-center">
                                <ResetButton type="reset" id="reset" className="inline-flex items-center px-5 py-2.5 mr-4 text-xs sm:text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600">Reset</ResetButton>
                                <SubmitButton type="submit" id="importTrade" disabled={isSubmitting}>Submit</SubmitButton>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddTrade;