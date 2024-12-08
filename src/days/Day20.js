import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day20 = () => {
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
            dayNumber={20}
            verseReference="john 1:29"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 20 */}
            </div>
        </DayLayout>
    );
};

export default Day20;
