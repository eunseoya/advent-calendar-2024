import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day3 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={3}
            verseReference="matthew+1:22-23"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 3 */}
            </div>
        </DayLayout>
    );
};

export default Day3;
