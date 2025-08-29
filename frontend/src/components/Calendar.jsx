import { useState } from 'react';
import Calendar from 'react-calendar';
import Card from './Card'
import 'react-calendar/dist/Calendar.css';

function CalendarCard() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Calendar
        onChange={setValue}
        value={value}
        className="rounded-lg shadow-sm !w-full border-none !h-full"
        tileClassName={({ date, view }) =>
          view === 'month' && date.toDateString() === new Date().toDateString()
            ? 'bg-blue-100 text-blue-800 font-semibold rounded-lg'
            : ''
        }
      />
    </div>
  );
}

export default CalendarCard;
