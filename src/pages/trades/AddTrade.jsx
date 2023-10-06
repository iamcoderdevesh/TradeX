import React from 'react'

const AddTrade = () => {
    return (
        <div className="p-2 dark:bg-primary-dark md:ml-64 md:p-4">
            <div className="p-2 mt-8 md:p-4">
                <h3 className='text-xl font-medium dark:text-white my-4 mt-8 lg:my-4'>Add Trade</h3>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                        <li className="mr-2" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg text-primary-100 hover:text-primary-100 dark:text-primary-100 dark:hover:text-primary-100 border-primary-100 dark:border-primary-100" id="Open-tab" type="button">Open</button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 dark:text-white hover:border-gray-300 dark:hover:text-gray-300" id="close-tab" type="button">Close</button>
                        </li>
                    </ul>
                </div>
                <div id="TabContent">
                    <div className="p-4" id="open">
                        <section className="bg-white dark:bg-primary-dark">
                            <div className="py-8 px-1 max-w-2xl lg:py-2">
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                                <form action="#">
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                            <input type="text" name="brand" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                            <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option selected="">Select category</option>
                                                <option value="TV">TV/Monitors</option>
                                                <option value="PC">PC</option>
                                                <option value="GA">Gaming/Console</option>
                                                <option value="PH">Phones</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                            <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-100 rounded-lg hover:bg-primary-200">Open Position</button>
                                </form>
                            </div>
                        </section>

                    </div>
                    <div className="hidden p-4" id="close">
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddTrade
