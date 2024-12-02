// src/components/LanguageToggle.js

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();
    
    return (
        <button 
            onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
            className="px-2 py-1 text-sm rounded-md bg-[#fdffff] text-[#6d1c22]"
        >
            {language === 'en' ? 'ENG' : '한국어'}
        </button>
    );
};

export default LanguageToggle;