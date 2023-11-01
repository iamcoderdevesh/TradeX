import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'assets/logo';
import InputField from 'components/common/inputs/InputField';
import Checkbox from 'components/common/checkbox';
import {Button} from 'components/common/buttons';

const Login = () => {

  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 dark:bg-primary-dark">
      <div className="min-h-screen flex flex-col items-center lg:justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-main-dark dark:border-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <InputField label={"Your email"} placeholder={"name@company.com"} id={"email"} type={"email"} htmlName={"email"} />
              </div>
              <div>
                <InputField label={"Password"} placeholder={"••••••••"} id={"password"} type={"password"} htmlName={"password"} />
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
              <Button type="submit" id="sign-in" onClick={() => navigate('/')}>Sign in</Button>
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
