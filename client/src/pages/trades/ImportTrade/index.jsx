import React, { useState } from 'react'
import Dropdown from 'components/common/dropdown';
import { SubmitButton, ResetButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';
import { AccountDropdown } from 'components/common/dropdown/accountDropdown';
import { ImportSchema } from 'helpers/validation';
import { useFormik } from "formik";
import { useImportTradeMutation } from 'state/api/trade/tradeApi';

const ImportTrade = () => {

  const initialValues = { account: '', broker: '', description: '', file: ''  };
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, setFieldValue } = useFormik({
      initialValues,
      validationSchema: ImportSchema,
      onSubmit: values => {
          submitForm(values);
      },
  });

  const handleFileChange = (event) => {
    setFieldValue('file', event.target.files[0]);
  };

  const [importTrade, { isLoading }] = useImportTradeMutation();

  const submitForm = async (formData) => {
    try {
      formData.AccountId = parseInt(formData.account);
      delete formData.account;

      // Create a new FormData instance
      const data = new FormData();

      // Append all form fields to the FormData instance
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      await importTrade(data).unwrap();
    } catch (error) {
      return;
    }
  }

  return (
    <>
      <div className="flex">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Import Your Trades</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className='col-span-2 sm:col-span-1'>
                  <Dropdown label={"Select Broker"} id={"ddBroker"} htmlName={"broker"} errorMsg={errors.broker && touched.broker && errors.broker} onChange={handleChange} onBlur={handleBlur} value={values.broker}
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
                <div className='col-span-2 sm:col-span-1'>
                  <AccountDropdown label={'Select Account'} htmlName={"account"} errorMsg={errors.account && touched.account && errors.account} onChange={handleChange} onBlur={handleBlur} value={values.account} />
                </div>
                <div className="col-span-2">
                  <InputField label={"Upload Your Excel File"}  placeholder={"Choose a file"} id={"fileimport"} type={"file"} htmlName={"file"} handleChange={handleFileChange} />
                </div>
                <div className='col-span-2'>
                  <InputField label={"Description"} placeholder={"Add Description"} id={"tag-description"} type={"textArea"} htmlName={"description"} errorMsg={errors.description && touched.description && errors.description} handleChange={handleChange} onBlur={handleBlur} value={values.description} />
                </div>
                <div className="flex flex-row items-start mt-5">
                  <ResetButton id="reset">Reset</ResetButton>
                  <SubmitButton id="importTrade">Submit</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImportTrade;
