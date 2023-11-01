import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/buttons';
import Logo from 'assets/logo';
import Checkbox from 'components/common/checkbox/index';
import InputField from 'components/common/inputs/InputField';

const Signup = () => {
    return (
        <div>
            <section className="bg-gray-50 dark:bg-primary-dark">
                <div className="min-h-screen flex flex-col items-center lg:justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Logo margin={"mb-4"} height={"sm:h-10 sm:w-10"} />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-main-dark dark:border-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"email"} htmlName={"email"} />
                                </div>
                                <div>
                                    <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"password"} />
                                </div>
                                <div>
                                    <InputField label={"Confirm Password"} placeholder={"••••••••"} id={"confirm-password"} type={"password"} htmlName={"confirm-password"} />
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
                                <Button type="submit" id="create-account">Create an account</Button>
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
