import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day14 = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={14}
            verseReference="1 john 4:9"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 14 */}
            </div>
        </DayLayout>
    );
};

export default Day14;