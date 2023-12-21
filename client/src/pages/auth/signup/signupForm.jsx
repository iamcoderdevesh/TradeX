import React, { useEffect } from 'react';
import { useFormik } from "formik";
import InputField from 'components/common/inputs/InputField';
import Checkbox from 'components/common/checkbox';
import { Button } from 'components/common/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpSchema } from 'helpers/validation';
import { useSignUpMutation } from "state/api/auth/authApi.js";

const SignupForm = () => {

    const [signUp, { isLoading, isSuccess, data }] = useSignUpMutation();
    const navigate = useNavigate();

    const initialValues = {
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };

    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    useEffect(() => {
        if (isSuccess) {
            navigate('/auth/login');
        }
    }, [isSuccess, data]);

    const submitForm = async (values) => {
        delete values.ConfirmPassword;
        try {
            await signUp(values).unwrap();
        } catch (error) {
            return;
        }
    }


    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <InputField label={"Username"} placeholder={"Neil Sims"} id={"username"} type={"text"} htmlName={"UserName"} handleChange={handleChange} value={values.UserName} onBlur={handleBlur} errorMsg={errors.UserName && touched.UserName && errors.UserName} />
            </div>
            <div>
                <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"text"} htmlName={"Email"} value={values.Email} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.Email && touched.Email && errors.Email} />
            </div>
            <div>
                <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"Password"} value={values.Password} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.Password && touched.Password && errors.Password} />
            </div>
            <div>
                <InputField label={"Confirm Password"} placeholder={"••••••••"} id={"ConfirmPassword"} type={"password"} htmlName={"ConfirmPassword"} handleChange={handleChange} value={values.ConfirmPassword} onBlur={handleBlur} errorMsg={errors.ConfirmPassword && touched.ConfirmPassword && errors.ConfirmPassword} />
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <Checkbox id="terms" />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the{" "}
                        <a className="font-medium text-primary-100 hover:underline dark:text-brand-100" href="#">Terms and Conditions</a>
                    </label>
                </div>
            </div>
            <Button type="submit" id="create-account" disabled={isSubmitting}>Create an account</Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account?{" "}
                <Link
                    to={"/auth/login"}>
                    <span className="font-medium text-primary-100 dark:text-brand-100 hover:underline">Login here</span>
                </Link>
            </p>
        </form>
    )
}

export default SignupForm;
