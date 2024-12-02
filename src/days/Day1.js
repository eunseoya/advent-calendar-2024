import React from 'react';
import DayLayout from '../components/DayLayout';
import YouTubeEmbed from '../components/YouTubeEmbed';
import { useLanguage } from '../context/LanguageContext';

const englishVid = 'IlEFgKv9ay0';
const koreanVid = 'VCtubH9D96A';

const Day1 = () => {
    const { language } = useLanguage();
    const videoId = language === 'en' ? englishVid : koreanVid;

    return (
        <DayLayout
            dayNumber={1}
            verseReference="john+1:9-10"
        >
           <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <YouTubeEmbed videoId={videoId} />
            </div>
        </DayLayout>
    );
};

export default Day1;