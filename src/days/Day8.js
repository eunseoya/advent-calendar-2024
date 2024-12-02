import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day8 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={8}
            verseReference="isaiah+9:6"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 8 */}
            </div>
        </DayLayout>
    );
};

export default Day8;
