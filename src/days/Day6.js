import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day6 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={6}
            verseReference="luke 1:35"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 6 */}
            </div>
        </DayLayout>
    );
};

export default Day6;
