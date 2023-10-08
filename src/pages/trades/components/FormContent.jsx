import React, { useState } from 'react';
import InputField from '../../../components/common/inputs/InputField';
import Dropdown from '../../../components/common/dropdown';
import Button from '../../../components/common/buttons';
import { Inputs } from "../variables/FormVariables";

const FormContent = () => {
    const [formData, setFormData] = useState({ Symbol: "", EntryDate: "", ExitDate: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(`Symbol: ${formData.Symbol}, Entry Date: ${formData.EntryDate}, Exit Date: ${formData.ExitDate}`);
    };

    return (
        <div className="p-4">
            <section className="bg-white dark:bg-primary-dark">
                <div className="py-8 px-1 max-w-2xl lg:py-2">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Trade Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {Inputs.FormDropdown.map((items) => (
                                <div key={items.id}>
                                    <Dropdown label={items.label} id={items.id}
                                        children={
                                            items.children.map((child) => (
                                                <option key={child}>{child}</option>
                                            ))
                                        } />
                                </div>
                            ))}
                            {Inputs.FormInputs.map((items) => (
                                // items.id === "ScreenShot" ?
                                // FormAddDropdown.map((dropdown) => (
                                //     <div key={dropdown.id}>
                                //         <Dropdown label={dropdown.label} id={dropdown.id}
                                //             children={
                                //                 dropdown.children.map((child) => (
                                //                     <option key={child}>{child}</option>
                                //                 ))
                                //             } />
                                //     </div>
                                // )) :
                                <div key={items.id} className={items.divClass}>
                                    <InputField label={items.label} divClass={items.divClass} placeholder={items.placeholder} id={items.id} type={items.type} htmlName={items.id} handleChange={handleChange} />
                                </div>
                            ))}
                        </div>

                        <Button type="reset" id="reset" label="Reset" buttonClass="inline-flex items-center px-5 py-2.5 mt-4 mr-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-500" />
                        <Button type="submit" id="submit" label="Open Position" buttonClass="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200" />
                    </form>
                </div>
            </section>
        </div>
    )
}

export default FormContent;