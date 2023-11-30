import React, { useEffect } from 'react';
import { useFormik } from "formik";
import InputField from 'components/common/inputs/InputField';
import { useSelector } from 'react-redux';
import { Toast } from 'components/common/alerts';
import { SubmitButton } from 'components/common/buttons';
import Dropdown from 'components/common/dropdown';
import { ResetButton } from 'components/common/buttons';
import { TagSchema } from 'helpers/validation';
import { useCreateUpadateTagsMutation } from 'state/api/tags/tagApi';

const TagForm = () => {

    const userInfo = useSelector((state) => state.auth.userInfo, []);
    const { TagName, TagType, TagDesc } = userInfo || {};

    const { values, errors, touched, isValid, dirty, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: {
            TagName: TagName,
            TagType: TagType,
            TagDesc: TagDesc
        },
        validationSchema: TagSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    const [createUpadateTags, { isLoading, isSuccess, data }] = useCreateUpadateTagsMutation();

    useEffect(() => {
        if (isSuccess) {
            Toast.success(data.message);
        }
    }, [isSuccess, data]);


    const submitForm = async (formData) => {
        try {
            await createUpadateTags(formData).unwrap();
        } catch (error) {
            return;
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                    <InputField label={"Tag Name"} placeholder={"Ex.: Setup Created"} id={"tag-name"} type={"text"} htmlName={"TagName"} value={values.TagName} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.TagName || touched.TagName} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Tag Type"} id={"ddTags"} htmlName={"TagType"} errorMsg={errors.TagType || touched.TagType} onChange={handleChange} onBlur={handleBlur} value={values.TagType}
                        children={
                            <>
                                <option>Select Type</option>
                                <option>SETUP</option>
                                <option>MISTAKE</option>
                                <option>CUSTOM</option>
                            </>
                        } />
                </div>
                <div className="sm:col-span-2">
                    <InputField label={"Description"} placeholder={"Add Description"} id={"tag-description"} type={"text"} htmlName={"TagDesc"} value={values.TagDesc} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.TagDesc || touched.TagDesc} />
                </div>
                <div className="flex flex-row items-center mt-5">
                    <ResetButton id="reset">Reset</ResetButton>
                    <SubmitButton type="submit" id="profileBtn" disabled={!(dirty && isValid) || isLoading}>Submit</SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default TagForm;
