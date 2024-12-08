import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day11 = () => {
    const { language } = useLanguage();
    const translations = {
        en: {
            // item: 'sample text', 
        },
        ko: {
            // item: '샘플 문구',
        }
    };
    const t = translations[language];

    return (
        <DayLayout
            dayNumber={11}
            verseReference="james 1:17"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 11 */}
            </div>
        </DayLayout>
    );
};

export default Day11;
