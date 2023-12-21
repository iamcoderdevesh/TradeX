import React from 'react';
import Logo from 'assets/logo';
import { ToastContainer } from 'components/common/alerts';
import LoginForm from './loginForm';

const Login = () => {
  return (
    <section className="bg-gray-50 dark:bg-primary-dark">
      <div className="min-h-screen flex flex-col items-center lg:justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo margin={"mb-6"} height={"sm:h-10 sm:w-10"} />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-main-dark dark:border-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
