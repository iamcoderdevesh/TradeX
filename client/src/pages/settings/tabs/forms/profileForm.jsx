import React, { useEffect } from 'react';
import { useFormik } from "formik";
import InputField from 'components/common/inputs/InputField';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation } from 'state/api/user/userApi';
import { Toast } from 'components/common/alerts';
import { formatDate } from 'utils';
import { SubmitButton } from 'components/common/buttons';

const ProfileForm = () => {

    const userInfo = useSelector((state) => state.auth.userInfo, []);
    const { FirstName, LastName, Email, Phone, BirthDate } = userInfo || {};
  
    const { values, isValid, dirty, handleChange, handleSubmit, handleBlur } = useFormik({
      initialValues: {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
        BirthDate: BirthDate
      },
      onSubmit: values => {
        submitForm(values);
      },
    });
  
    const [updateProfile, { isLoading, isSuccess, data }] = useUpdateProfileMutation();
  
    useEffect(() => {
      if (isSuccess) {
        Toast.success(data.message);
      }
    }, [isSuccess, data]);
  
  
    const submitForm = async (formData) => {
      try {
        await updateProfile(formData).unwrap();
      } catch (error) {
        return;
      }
    }

    return (
        <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
            <div className="py-8 px-1 max-w-2xl lg:py-2">
                <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">General Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="w-full">
                            <InputField label={"First Name"} id={"firstName"} type={"text"} htmlName={"FirstName"} value={values.FirstName} handleChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="w-full">
                            <InputField label={"Last Name"} id={"lastName"} type={"text"} htmlName={"LastName"} value={values.LastName} handleChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="sm:col-span-2">
                            <InputField label={"Email"} id={"email"} type={"email"} htmlName={"Email"} value={values.Email} handleChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="w-full">
                            <InputField label={"Phone"} id={"phone"} type={"phone"} htmlName={"Phone"} value={values.Phone} handleChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="w-full">
                            <InputField label={"Birthday"} id={"birthday"} type={"date"} htmlName={"BirthDate"} value={formatDate(values.BirthDate)} handleChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <div className="sm:col-span-2">
                            <InputField label={"Your avatar"} placeholder={"Choose a file"} id={"ProfileImg"} type={"file"} htmlName={"profileImg"} />
                        </div>
                        <div className="flex flex-row items-center mt-5">
                            <SubmitButton type="submit" id="profileBtn" disabled={!(dirty && isValid) || isLoading}>Submit</SubmitButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileForm;
