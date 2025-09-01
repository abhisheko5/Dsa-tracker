import { useState } from 'react';
import Calendar from 'react-calendar';
import api from "../api/axios";

import 'react-calendar/dist/Calendar.css';

function CalendarCard() {
  const [value, setValue] = useState(new Date());
  const [hoverData, setHoverData] = useState({}); // store solved problems per date

  // Function to fetch solved problems for a given date
  const fetchSolvedForDate = async (date) => {
    const dateStr = date.toISOString().split('T')[0];
    // Avoid refetching if we already have data
    if (hoverData[dateStr]) return;

    try {
      const res = await api.get(
        `https://dsa-tracker-nh8t.onrender.com/api/status/solvedproblems?date=${dateStr}`
      );
      setHoverData((prev) => ({
        ...prev,
        [dateStr]: res.data.data.map((p) => p.problem.title),
      }));
    } catch (err) {
      console.error("Error fetching solved problems for date:", dateStr, err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Calendar
        onChange={setValue}
        value={value}
        className="rounded-lg shadow-sm !w-full border-none !h-full"
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const problems = hoverData[dateStr];

            if (problems?.length) {
              return (
                <div
                  className="text-center mt-1"
                  onMouseEnter={() => fetchSolvedForDate(date)}
                  title={problems.join(', ')} // Hover tooltip
                >
                  <span className="bg-blue-500 w-2 h-2 rounded-full inline-block"></span>
                </div>
              );
            }
          }
        }}
      />
    </div>
  );
}

export default CalendarCard;
