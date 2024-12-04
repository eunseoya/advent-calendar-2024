import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';
import PhotoUploader from '../components/PhotoUploader';

const Day3 = () => {
    const { language } = useLanguage();

    const text = {
        en: {
            title: "Warm words for a Winter's day",
            message: "Share the warmth with someone through a kind message. Take a moment to send a text to a friend, family member, or anyone who could use a little encouragement.",
            screenshot: "Share a screenshot of your text - feel free to exclude names (an anonymized version will be shared on this page)"
        },
        ko: {
            title: "겨울날의 따뜻한 한마디",
            message: "친구, 가족 또는 격려가 필요한 사람에게 따뜻한 말 한마디를 보내주세요!",
            screenshot: "보낸 문자를 스샷해서 올려주세요 - 이름을 제외해도 좋아요 (익명 버전이 이 페이지에 공유돼요)"
        }
    };

    return (
        <DayLayout
            dayNumber={3}
            verseReference="matthew+1:22-23"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">{text[language].title}</h1>
                    {/* <img src='/img/day3.png' alt=""/> */}
                    <p>{text[language].message}</p>
                    <p>{text[language].screenshot}</p>
                    <PhotoUploader /> 
                </div>
            </div>
        </DayLayout>
    );
};

export default Day3;
