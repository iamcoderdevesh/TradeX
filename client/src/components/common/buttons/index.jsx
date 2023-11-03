import React, { forwardRef } from "react"

export const Button = forwardRef(({ className, ...props }, ref) => (

    <button
    className="w-full px-5 py-2.5 text-sm sm:text-base font-medium text-center text-white bg-brand-300 rounded-lg hover:bg-brand-200"
    ref={ref}
    {...props}></button>

));

export const SubmitButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="submit"
    className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-brand-300 rounded-lg hover:bg-brand-200"
    ref={ref}
    {...props}></button>

));

export const DeleteButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="submit"
    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-red border border-red rounded-lg hover:bg-red hover:text-white"
    ref={ref}
    {...props}></button>

));

export const ResetButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="reset" 
    className="inline-flex items-center px-5 py-2 mr-4 text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600"
    ref={ref}
    {...props}></button>

));

export const IconButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="button" 
    className={`bg-white hover:bg-gray-200 dark:bg-main-dark dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex justify-between items-center shadow-md m-2`}
    ref={ref}
    {...props}></button>

));
