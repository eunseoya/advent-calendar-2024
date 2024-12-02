import React from 'react';
import { Link } from 'react-router-dom';
import { getDate, getMonth } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const AdventCalendar = () => {
    const currentDate = toZonedTime(new Date(), 'America/New_York');
    const currentDay = getDate(currentDate);
    const currentMonth = getMonth(currentDate);

    const rows = [
        [25],
        [23, 24],
        [20, 21, 22],
        [16, 17, 18, 19],
        [10, 11, 12, 13, 14, 15],
        [3, 4, 5, 6, 7, 8, 9],
        [1, 2],
    ];

    return (
        <div className="p-2 sm:p-4 space-y-2 sm:space-y-4 bg-[#6d1c22]">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2 sm:space-x-4">
                    {row.map((day) => (
                        <div
                            key={day}
                            className={`w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-0 rounded text-sm sm:text-base ${
                                currentMonth === 11 && day <= currentDay ? 'bg-[#4d9165] text-white' : 'bg-[#fdffff] text-[#b19078]'
                            }`}
                        >
                            {currentMonth === 11 && day <= currentDay ? (
                                <Link to={`/day${day}`} className="text-center w-full h-full flex items-center justify-center text-white">
                                    {day}
                                </Link>
                            ) : (
                                `${day}`
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AdventCalendar;