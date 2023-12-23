import React, { useEffect } from 'react';
import { useFormik } from "formik";
import InputField from 'components/common/inputs/InputField';
import { useLocation } from 'react-router-dom';
import { SubmitButton } from 'components/common/buttons';
import Dropdown from 'components/common/dropdown';
import { ResetButton } from 'components/common/buttons';
import { TagSchema } from 'helpers/validation';
import { useCreateUpadateTagsMutation, useGetTagDetailsQuery } from 'state/api/tags/tagApi';

const TagForm = ({ setShowTagForm }) => {

    const TagId = new URLSearchParams(useLocation().search).get('tagId');
    const { data: TagInfo, isLoading: isLoadingTag } = useGetTagDetailsQuery(TagId, {
        refetchOnMountOrArgChange: true,
        skip: !TagId
    });

    const initialValues = TagInfo ? { ...TagInfo } : { TagName: '', TagType: '', TagDesc: '' };
    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, setValues } = useFormik({
        initialValues,
        validationSchema: TagSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    const [createUpadateTags, { isSuccess, data }] = useCreateUpadateTagsMutation();

    useEffect(() => {
        isSuccess && setShowTagForm(false);

        //Dynamically Setting the Values of form for Update/Edit Operation of account.
        TagInfo && setValues(initialValues);
        
    }, [isSuccess, data, TagInfo, isLoadingTag, setValues]);


    const submitForm = async (formData) => {
        try {
            if (TagId) formData.TagId = TagId;
            await createUpadateTags(formData).unwrap();
        } catch (error) {
            return;
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                    <InputField label={"Tag Name"} placeholder={"Ex.: Setup Created"} id={"tag-name"} type={"text"} htmlName={"TagName"} value={values.TagName} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.TagName && touched.TagName && errors.TagName} />
                </div>
                <div className="w-full">
                    <Dropdown label={"Select Tag Type"} id={"ddTags"} htmlName={"TagType"} errorMsg={errors.TagType && touched.TagType && errors.TagType} onChange={handleChange} onBlur={handleBlur} value={values.TagType}
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
                    <InputField label={"Description"} placeholder={"Add Description"} id={"tag-description"} type={"text"} htmlName={"TagDesc"} value={values.TagDesc} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.TagDesc && touched.TagDesc && errors.TagDesc} />
                </div>
                <div className="flex flex-row items-center mt-5">
                    <ResetButton id="reset">Reset</ResetButton>
                    <SubmitButton type="submit" id="profileBtn" disabled={isSubmitting}>Submit</SubmitButton>
                </div>
            </div>
        </form>
    )
}

export default TagForm;
