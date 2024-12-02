import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day18 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={18}
            verseReference="luke 2:10"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 18 */}
            </div>
        </DayLayout>
    );
};

export default Day18;
