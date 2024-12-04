import React, { useState } from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';
import OrnamentDecoration from '../components/OrnamentDecoration';

const Day4 = () => {
    const { language } = useLanguage();
    const [secretMessage, setSecretMessage] = useState('');

    const handleComplete = (message) => {
        setSecretMessage(message);
    };

    return (
        <DayLayout
            dayNumber={4}
            verseReference="john 1:29"
        >
            <div className="w-full flex items-center justify-center p-10 md:p-16 lg:p-24">
                <OrnamentDecoration onComplete={handleComplete} />
            </div>
            {secretMessage && (
                <div className="secret-message">
                    <p>{secretMessage}</p>
                </div>
            )}
        </DayLayout>
    );
};

export default Day4;
