import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

let showMessage = true;

const today_message = "You made it to the end of Week 1! \
    On Monday, the past week's missions will no longer count submissions. \
    This is your last chance to complete this week's missions. See submissions on Happy Sunday Gallery :)";
//"Today's new mission is ready! 🎉";
const today_message_ko = "1주차 미션이 끝났어요! \
    오늘이 이번 주 미션을 완수할 마지막 기회에요. 다음 주에는 2주차 미션만 제출이 인정돼요. \
    여러분의 이번 주 미션은 즐거운 주일 전시회에서 확인하실 수 있습니다 :)";

const Announcement = ({ onClose }) => {
    const { language } = useLanguage();
    const [showMessageState, setShowMessageState] = useState(showMessage);
    const translations = {
        en: {
            announcementTitle: 'Announcement 📢',
            message: today_message,
            dontShowAgain: "Ok"
        },
        ko: {
            announcementTitle: '공지 📢',
            message: today_message_ko,
            dontShowAgain: '다시 보지 않기'
        }
    };

    const t = translations[language];
    useEffect(() => {
        const hasSeenMessage = localStorage.getItem('hasSeenMessage');
        if (hasSeenMessage) {
            setShowMessageState(false);
            showMessage = false;
        }
    }, []);

    const handleDontShowAgain = () => {
        localStorage.setItem('hasSeenMessage', 'true');
        setShowMessageState(false);
        showMessage = false;
        onClose();
    };

    const handleClose = () => { 
        localStorage.setItem('hasSeenMessage', 'true');
        setShowMessageState(false);
        showMessage = false;
        onClose();
    }

    if (!showMessageState) { return null; }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg relative w-80 max-w-full">
                <button className="absolute top-2 right-2 text-2xl" onClick={handleClose}>X</button>
                <h2 className="text-xl mb-4">{t.announcementTitle}</h2>
                <p className="mt-4 text-center">{t.message}</p>
                {/* <div className="flex justify-center">
                    <button className="mt-4 bg-[#4f9065] text-white py-2 px-4 rounded" onClick={handleDontShowAgain}>
                        {t.dontShowAgain}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export { showMessage };
export default Announcement;