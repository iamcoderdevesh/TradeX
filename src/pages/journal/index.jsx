import React from 'react';
import Accordion from './component/';

const Journal = () => {
  return (
    <section className='h-full'>
      <h3 className='text-xl font-medium dark:text-white my-4 mt-8 lg:my-4'>Journal</h3>
      <Accordion status={true} />
      <Accordion status={false} />
      <Accordion status={true} />
    </section>
  )
}

export default Journal;
