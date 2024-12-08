import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Carousel = ({ type, items }) => {
    const { language } = useLanguage();
    const [texts, setTexts] = useState([]);
    const translations = {
        en: {
        },
        ko: {
        }
    };
    const t = translations[language];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (type === 'text') {
            const fetchTexts = async () => {
                const querySnapshot = await getDocs(collection(db, items));
                const textsArray = querySnapshot.docs.map(doc => doc.data().text);
                setTexts(textsArray);
            };
            fetchTexts();
        }
    }, [type]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (type === 'text' ? texts.length : items.length));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (type === 'text' ? texts.length : items.length)) % (type === 'text' ? texts.length : items.length));
    };

    return (
        <div className="carousel flex items-center justify-center px-2 md:px-4">
            <button onClick={handlePrev} className="px-2 py-1 md:px-4 md:py-2 rounded">{'<'}</button>
            {type === 'image' ? (
                <img src={items[currentIndex]} alt={`carousel-item-${currentIndex}`} className="w-full h-auto mx-2 md:mx-4" />
            ) : (
                <p className="text-center px-2 md:px-0">{texts[currentIndex]}</p>
            )}
            <button onClick={handleNext} className="px-2 py-1 md:px-4 md:py-2 rounded">{'>'}</button>
        </div>
    );
};

export default Carousel;

