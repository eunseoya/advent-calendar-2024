import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';
import MatchGame from '../components/MatchGame'; // Import MatchGame component

const Day6 = () => {
    const { language } = useLanguage();
    const translations = {
        en: {
            title: 'Little Match Girl Survival',
        },
        ko: {
            title: '성냥팔이 소녀로 살아남기',
        }
    };

    const t = translations[language];
    return (
        <DayLayout
            dayNumber={6}
            verseReference="luke 1:35"
        >
            <div className="w-full flex flex-col items-center justify-center p-8 md:p-16 lg:p-24">
                <h2 className="text-l font-bold mb-4">{t.title}</h2>
                <MatchGame /> 
            </div>
        </DayLayout>
    );
};

export default Day6;
