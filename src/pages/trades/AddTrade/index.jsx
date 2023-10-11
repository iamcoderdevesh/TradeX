import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import InputField from 'components/common/inputs/InputField';
import Dropdown from 'components/common/dropdown';
import Button from 'components/common/buttons';
import { Inputs } from "./variables/FormVariables";

const AddTrade = () => {
    const [formData, setFormData] = useState({ Symbol: "", EntryDate: "", ExitDate: "" });
    const [showAdd, setShowAdd] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-3xl p-6 mt-8 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-main-dark">
                <section>
                    <div className="py-8 px-1 max-w-2xl lg:py-2">
                        <h2 className="pb-4 mb-4 sm:mb-5 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Trade Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                {/* Below Code is displaying mutiple form elements using javascript object */}
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
                                    <div key={items.id} className={items.divClass}>
                                        <InputField label={items.label} divClass={items.divClass} placeholder={items.placeholder} id={items.id} type={items.type} htmlName={items.id} handleChange={handleChange} />
                                    </div>
                                ))}
                                {
                                    showAdd &&
                                    <div className="sm:col-span-2">
                                        <h2 className="pb-4 col-span-2 text-xl border-b font-bold text-gray-900 dark:text-white dark:border-gray-600">Additional Details</h2>
                                    </div>
                                }

                                {showAdd && Inputs.FormAddInputs.map((items) => (
                                    items.id === "null" ?
                                        Inputs.FormAddDropdown.map((dropdown) => (
                                            <div key={dropdown.id}>
                                                <Dropdown label={dropdown.label} id={dropdown.id}
                                                    children={
                                                        dropdown.children.map((child) => (
                                                            <option key={child}>{child}</option>
                                                        ))
                                                    } />
                                            </div>
                                        )) :
                                        <div key={items.id} className={items.divClass}>
                                            <InputField label={items.label} divClass={items.divClass} placeholder={items.placeholder} id={items.id} type={items.type} htmlName={items.id} handleChange={handleChange} />
                                        </div>
                                ))}
                            </div>

                            <div className="flex flex-row items-center justify-center my-4 sm:my-8">
                                <button onClick={() => setShowAdd(!showAdd)} className="flex flex-col items-center justify-center">
                                    {showAdd && <BiChevronUp className="dark:text-white cursor-pointer" />}
                                    <h3 className="text-base dark:text-white cursor-pointer">{showAdd ? "Less" : "More"}</h3>
                                    {!showAdd && <BiChevronDown className="dark:text-white cursor-pointer" />}
                                </button>
                            </div>

                            <div className="flex flex-row items-center">
                                <Button type="reset" id="reset" label="Reset" buttonClass="inline-flex items-center px-5 py-2.5  mr-4 text-xs sm:text-sm font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-600" />
                                <Button type="submit" id="submit" label="Add Trade" buttonClass="inline-flex items-center px-5 py-2.5 text-xs sm:text-sm font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddTrade;