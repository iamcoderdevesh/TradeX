import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/logo';
import InputField from 'components/common/inputs/InputField';
import Checkbox from 'components/common/checkbox';
import { Button } from 'components/common/buttons';
import { useSelector } from 'react-redux';
import { useLoginMutation } from "state/api/auth/authApi.js";
import { ToastContainer, Toast } from 'components/common/alerts';

const Login = () => {

  const navigate = useNavigate();
  const registeredMail = useSelector((state) => state.auth.userInfo.Email);
  const [formData, setFormData] = useState({
    Email: registeredMail || '',
    Password: ''
  });
  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.success(data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isSuccess, data]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    registeredMail && setFormData({ Email: registeredMail, Password: formData.Password });
    try {
      await login(formData).unwrap();
    } catch (error) {
      return;
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-primary-dark">
      <ToastContainer />
      <div className="min-h-screen flex flex-col items-center lg:justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo margin={"mb-6"} height={"sm:h-10 sm:w-10"} />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-main-dark dark:border-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"email"} htmlName={"Email"} value={registeredMail} require={true} handleChange={handleChange} disabled={registeredMail && true} />
              </div>
              <div>
                <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"Password"} require={true} handleChange={handleChange} />
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
              <Button type="submit" id="sign-in" disabled={isLoading}>Sign in</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? {" "}
                <Link
                  to={"/auth/signup"}>
                  <span className="font-medium text-primary-100 hover:underline dark:text-brand-100">Sign up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
