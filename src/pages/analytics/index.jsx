import React, { useState } from 'react';
import Overview from './components/overview';
import Detailed from './components/detailed';

const Analytics = () => {

  const [showTab, setShowTab] = useState(false);

  const activeTab = "inline-block p-4 border-b-2 rounded-t-lg text-brand-100 border-brand-100 active dark:text-white dark:border-brand-200";
  const inActiveTab = "inline-block p-4 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

  return (
    <section className='my-6 md:my-4'>
      <div className="text-xs font-semibold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-nowrap overflow-x-auto no-scrollbar -mb-px">
          <li className="mr-2">
            <button className={showTab ? inActiveTab : activeTab} onClick={() => setShowTab(!showTab)}>OVERVIEW</button>
          </li>
          <li className="mr-2">
            <button className={showTab ?  activeTab : inActiveTab} onClick={() => setShowTab(!showTab)}>DETAILED</button>
          </li>
        </ul>
      </div>
      {showTab ? <Detailed /> : <Overview />}
    </section>
  )
}

export default Analytics;
