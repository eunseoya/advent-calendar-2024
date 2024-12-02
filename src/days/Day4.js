import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day4 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={4}
            verseReference="john 1:29"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 4 */}
            </div>
        </DayLayout>
    );
};

export default Day4;
