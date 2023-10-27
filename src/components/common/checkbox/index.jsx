import React, { forwardRef } from "react"

const Checkbox = forwardRef(({ className, ...props }, ref) => (
    <input
        type="checkbox"
        className="w-4 h-4 text-primary-100 focus:ring-primary-100 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
        ref={ref}
        {...props}>
    </input>
))

export default Checkbox;
