import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Page404 = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <section className="min-h-screen bg-white dark:bg-primary-dark">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-brand-300">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the Dashboard page. </p>
                    <Link
                        to={isAuthenticated ? "/" : "/auth/login"}
                        className="inline-flex text-white bg-brand-300 hover:bg-brand-200 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Back to {isAuthenticated ? 'dashboard' : 'login'}</Link>
                </div>
            </div>
        </section>
    )
}

export default Page404;