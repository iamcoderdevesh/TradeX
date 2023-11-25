import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/common/buttons';
import Logo from 'assets/logo';
import Checkbox from 'components/common/checkbox';
import InputField from 'components/common/inputs/InputField';
import { useSignUpMutation } from "state/api/auth/authApi.js";
import { ToastContainer, Toast } from 'components/common/alerts';

const Signup = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ UserName: "", Email: "", Password: "", confirm_password: "" });
    const [signUp, { isLoading, isSuccess, data }] = useSignUpMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    useEffect(() => {
        if (isSuccess) {
            Toast.success(data.message);
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        }
    }, [isSuccess, data]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Password, confirm_password } = formData;
        if (Password.localeCompare(confirm_password) === (-1 || 1)) Toast.info(`Confirm Password doesn't match`)
        else {
            delete formData.confirm_password;
            try {
                await signUp(formData).unwrap();
            } catch (error) {
                return;
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <section className="bg-gray-50 dark:bg-primary-dark">
                <div className="min-h-screen flex flex-col items-center lg:justify-center px-6 py-8 mx-auto md:h-[45rem] lg:py-0">
                    <Logo margin={"mb-4"} height={"sm:h-10 sm:w-10"} />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-main-dark dark:border-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <InputField label={"Username"} placeholder={"Neil Sims"} id={"username"} type={"text"} htmlName={"UserName"} require={true} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"email"} htmlName={"Email"} require={true} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"Password"} require={true} handleChange={handleChange} />
                                </div>
                                <div>
                                    <InputField label={"Confirm Password"} placeholder={"••••••••"} id={"confirm_password"} type={"password"} htmlName={"confirm_password"} require={true} handleChange={handleChange} />
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
                                <Button type="submit" id="create-account" disabled={isLoading}>Create an account</Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account?{" "}
                                    <Link
                                        to={"/auth/login"}>
                                        <span className="font-medium text-primary-100 dark:text-brand-100 hover:underline">Login here</span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup;
