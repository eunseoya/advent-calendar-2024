import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day7 = () => {
    const { language } = useLanguage();
    const translations = {
        en: {
            signup: 'Stay updated on daily missions and more!',
        },
        ko: {
            signup: '매일 새로운 미션과 소식을 받아보세요!',
        }
    };
    const t = translations[language];
    return (
        <DayLayout
            dayNumber={7}
            verseReference="luke 1:14"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day 7 */}
            </div>
            <div className="mt-8 flex justify-center">
                <button className="px-4 py-2 bg-[#f3eeda] text-[#6d1c22] rounded">{t.signup}</button> 
                {/* onClick={handleComplete}  */}
            </div>
        </DayLayout>
    );
};

export default Day7;
