import React, { useState } from 'react';
import DayLayout from '../components/DayLayout';
import TextUploader from '../components/TextUploader';
import TextDisplayer from '../components/TextDisplayer';
import { useLanguage } from '../context/LanguageContext';

const Day5 = () => {
    const { language } = useLanguage();
    const [showTextDisplayer, setShowTextDisplayer] = useState(false);
    const [submittedText, setSubmittedText] = useState('');

    const translations = {
        en: {
            title: 'Share your favorite Christmas memory',
            message: "Share your favorite Christmas memory! It could be a story, a tradition, or a special moment.",
            alternateMessage: "You can now click the title to share another story or come back here directly."
        },
        ko: {
            title: '좋아하는 크리스마스의 추억',
            message: "가장 기억에 남는 크리스마스는 어땠나요? 이야기, 전통, 특별한 순간 등을 나눠주세요.",
            alternateMessage: "이제 다른 추억을 기록하거나 다시 추억들을 보려면 제목을 클릭하세요."
        }
    };

    const t = translations[language];

    const handleTitleClick = () => {
        setShowTextDisplayer(!showTextDisplayer);
        setSubmittedText('');         // Reinitialize submittedText when the title is clicked
    };

    return (
        <DayLayout
            dayNumber={5}
            verseReference="romans 12:10"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-l font-bold mb-4" onClick={handleTitleClick}>{t.title}</h2>
                    <p>{submittedText != ('') ? t.alternateMessage : t.message}</p>
                    <div className="mt-8">
                        {showTextDisplayer ? ( 
                            <TextDisplayer />
                        ) : (
                            <TextUploader day={5} submittedText={submittedText} setSubmittedText={setSubmittedText} />
                        )}
                    </div>
                </div>
            </div>
        </DayLayout>
    );
};

export default Day5;