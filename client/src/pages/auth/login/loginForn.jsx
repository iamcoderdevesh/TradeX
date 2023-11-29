import React, { useEffect } from 'react';
import { useFormik } from "formik";
import InputField from 'components/common/inputs/InputField';
import Checkbox from 'components/common/checkbox';
import { Button } from 'components/common/buttons';
import { Link, useNavigate } from 'react-router-dom';
import { SignInSchema } from 'helpers/validation';
import { useSelector } from 'react-redux';
import { useLoginMutation } from "state/api/auth/authApi.js";
import { Toast } from 'components/common/alerts';

const LoginForm = () => {

    const [login, { isLoading, isSuccess, data }] = useLoginMutation();
    const registeredMail = useSelector((state) => state.auth.userInfo?.Email);
    const navigate = useNavigate();

    const initialValues = {
        Email: registeredMail,
        Password: '',
    };

    const { values, errors, touched, isValid, dirty, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues: initialValues,
        validationSchema: SignInSchema,
        onSubmit: values => {
            submitForm(values);
        },
    });

    useEffect(() => {
        if (isSuccess) {
            Toast.success(data.message);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [isSuccess, data]);

    const submitForm = async (formData) => {
        try {
            await login(formData).unwrap();
        } catch (error) {
            return;
        }
    }


    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"text"} htmlName={"Email"} value={values.Email} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.Email || touched.Email} />
            </div>
            <div>
                <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"Password"} value={values.Password} handleChange={handleChange} onBlur={handleBlur} errorMsg={errors.Password || touched.Password} />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <Checkbox id="remember" />
                    </div>
                    <div className="ml-2 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-100 hover:underline dark:text-brand-100">Forgot password?</a>
            </div>
            <Button type="submit" id="sign-in" disabled={!(dirty && isValid) || isLoading}>Sign in</Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? {" "}
                <Link
                    to={"/auth/signup"}>
                    <span className="font-medium text-primary-100 hover:underline dark:text-brand-100">Sign up</span>
                </Link>
            </p>
        </form>
    )
}

export default LoginForm;
