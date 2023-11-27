import React, { useState, useEffect } from 'react'
import TabPanel from '../'
import { SubmitButton, DeleteButton } from 'components/common/buttons';
import InputField from 'components/common/inputs/InputField';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from 'state/api/auth/authApi';
import { Toast } from 'components/common/alerts';
import { formatDate } from 'components/utils';

const General = () => {

  const userInfo = useSelector((state) => state.auth.userInfo, []);
  const { FirstName, LastName, Email, PhoneNo:Phone, BirthDate } = userInfo || {};

  const [formData, setFormData] = useState({
    FirstName: FirstName || "",
    LastName: LastName || "",
    Email: Email || "",
    Phone: Phone || "",
    BirthDate: BirthDate || ""
  });
  const [updateProfile, { isLoading, isSuccess, data }] = useUpdateProfileMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.success(data.message);
    }
  }, [isSuccess, data]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
    } catch (error) {
      return;
    }
  }

  return (
    <div>
      <TabPanel />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">General Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <InputField label={"First Name"} id={"firstName"} type={"text"} htmlName={"FirstName"} value={FirstName} handleChange={handleChange} />
                </div>
                <div className="w-full">
                  <InputField label={"Last Name"} id={"lastName"} type={"text"} htmlName={"LastName"} value={LastName} handleChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                  <InputField label={"Email"} id={"email"} type={"email"} htmlName={"Email"} value={Email} handleChange={handleChange} />
                </div>
                <div className="w-full">
                  <InputField label={"Phone"} id={"phone"} type={"phone"} htmlName={"Phone"} value={Phone} handleChange={handleChange} />
                </div>
                <div className="w-full">
                  <InputField label={"Birthday"} id={"birthday"} type={"date"} htmlName={"BirthDate"} value={formatDate(BirthDate)} handleChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                  <InputField label={"Your avatar"} placeholder={"Choose a file"} id={"ProfileImg"} type={"file"} htmlName={"profileImg"} />
                </div>
                <div className="flex flex-row items-center mt-5">
                  <SubmitButton type="submit" id="profileBtn">Submit</SubmitButton>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
          <div className="py-8 px-1 max-w-2xl lg:py-2">
            <form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <h2 className="mb-2 sm:mb-2 text-sm font-bold text-gray-900 dark:text-white">Delete your account</h2>
                  <span className="text-sm text-gray-600 dark:text-white">Please note, deleting your account is a permanent action and will no be recoverable once completed.</span>
                </div>
                <div className="w-full flex sm:justify-end sm:items-start">
                  <DeleteButton id="profileBtn">Delete</DeleteButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default General