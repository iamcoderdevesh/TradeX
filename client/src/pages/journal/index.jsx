import React from 'react';
import Accordion from './component/';

const Journal = () => {
  return (
    <section className='h-full my-4 mt-8 lg:my-4'>
      <Accordion status={true} />
      <Accordion status={false} />
      <Accordion status={true} />
    </section>
  )
}

export default Journal;
