import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day10 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={10}
            verseReference="luke 6:38"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 10 */}
            </div>
        </DayLayout>
    );
};

export default Day10;
