import React from 'react';
import FullCalendar from 'components/common/full-calendar';
import PnlPopup from './pnl-popup';

const PnLCalendar = () => {

  return (
    <div className="my-4 mt-8 lg:my-4">
      <FullCalendar />
      <PnlPopup/>
    </div>
  )
}

export default PnLCalendar;
