import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarCard({children}) {
  const [value, setValue] = useState(new Date());

  return (
    <div className="rounded-xl  shadow-md bg-gradient-to-br from-white to-blue-50 w-full h-full">
      <div className=" flex items-center justify-between">
       {children}
      </div>

      <Calendar
        onChange={setValue}
        value={value}
        className="rounded-lg shadow-sm "
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
