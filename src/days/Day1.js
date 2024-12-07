import React, { useState } from 'react';
import DayLayout from '../components/DayLayout';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useLanguage } from '../context/LanguageContext';
import SubscriptionForm from '../components/SubscriptionForm';

const englishVid = 'IlEFgKv9ay0';
const koreanVid = 'VCtubH9D96A';

const Day1 = () => {
    const [showForm, setShowForm] = useState(false);
    const { language } = useLanguage();
    const videoId = language === 'en' ? englishVid : koreanVid;
    const translations = {
        en: {
            signup: 'Stay updated on daily missions and more!',
        },
        ko: {
            signup: '매일 새로운 미션과 소식을 받아보세요!',
        }
    };
    const t = translations[language];
    const toggleSubscriptionForm = () => {
        setShowForm(!showForm);
    };
    return (
        <DayLayout
            dayNumber={1}
            verseReference="john+1:9-10"
        >
           <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <YouTubeEmbed videoId={videoId} />
            </div>
            <div className="flex justify-center">
                <button className="px-4 py-2 bg-[#f3eeda] text-[#6d1c22] rounded" onClick={toggleSubscriptionForm}>{t.signup}</button> 
                {showForm && <SubscriptionForm onClose={toggleSubscriptionForm} />}
            </div>
        </DayLayout>
    );
};

export default Day1;