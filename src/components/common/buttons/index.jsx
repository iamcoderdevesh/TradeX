import React, { forwardRef } from "react"

export const Button = forwardRef(({ className, ...props }, ref) => (

    <button
    className="w-full px-5 py-2.5 text-sm sm:text-base font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200"
    ref={ref}
    {...props}></button>

));

export const SubmitButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="submit"
    className="inline-flex items-center px-5 py-2.5 text-sm sm:text-base font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200"
    ref={ref}
    {...props}></button>

));

export const DeleteButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="submit"
    className="inline-flex items-center px-5 py-2.5 text-sm sm:text-base font-medium text-center text-red border border-red rounded-lg hover:bg-red hover:text-white"
    ref={ref}
    {...props}></button>

));

export const ResetButton = forwardRef(({ className, ...props }, ref) => (

    <button
    type="reset" 
    className="inline-flex items-center px-5 py-2.5  mr-4 text-sm sm:text-base font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600"
    ref={ref}
    {...props}></button>

));
