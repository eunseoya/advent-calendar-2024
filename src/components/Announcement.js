import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

let showMessage = true;

const today_message = "Day 6 is ready!"//"Today's new mission is ready! 🎉";
const today_message_ko = '오늘의 미션을 확인하세요! 🎉';

const Announcement = ({ onClose }) => {
    const { language } = useLanguage();
    const [showMessageState, setShowMessageState] = useState(showMessage);
    const translations = {
        en: {
            announcementTitle: 'Announcement',
            message: today_message,
            dontShowAgain: "I'm Ready!"
        },
        ko: {
            announcementTitle: '공지',
            message: today_message_ko,
            dontShowAgain: '다시 보지 않기'
        }
    };

    const t = translations[language];
    useEffect(() => {
        const hasSeenMessage = localStorage.getItem('hasSeenMessage');
        if (hasSeenMessage) {
            setShowMessageState(true);
            showMessage = false;
        }
    }, []);

    const handleDontShowAgain = () => {
        localStorage.setItem('hasSeenMessage', 'true');
        setShowMessageState(false);
        showMessage = false;
        onClose();
    };

    if (!showMessageState) { return null; }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg relative w-80 max-w-full">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
                <h2 className="text-xl mb-4">{t.announcementTitle}</h2>
                <p className="mt-4 text-center">{t.message}</p>
                <div className="flex justify-center">
                    <button className="mt-4 bg-[#4f9065] text-white py-2 px-4 rounded" onClick={handleDontShowAgain}>
                        {t.dontShowAgain}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { showMessage };
export default Announcement;