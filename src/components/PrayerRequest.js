import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import TextDisplayer from './TextDisplayer';
import {useLanguage} from '../context/LanguageContext';

const PrayerRequest = () => {
    const { language } = useLanguage();
    const [inputText, setInputText] = useState('');
    const [name, setPassword] = useState('');
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const translations = {
        en: {
            placeholder: "Enter your text here (max 200 words)",
            namePlaceholder: "Enter name",
            modify: "Modify",
            confirm: "Confirm",
            review: "Review",
            confirmation_msg: "Thank you for sharing. I'll be praying for you 💖"
        },
        ko: {
            placeholder: "여기에 적어주세요 (최대 200 단어)",
            namePlaceholder: "이름을 입력하세요",
            modify: "수정",
            confirm: "제출하기",
            review: "확인",
            confirmation_msg: "기도제목 나눠줘서 고마워요. 기도할게요 💖"
        }
    };

    const t = translations[language];

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, 'prayer_request'), {
                text: inputText,
                name,
                timestamp: new Date(),
            });
            setInputText('');
            setPassword('');
            setIsReviewMode(false);
            setIsConfirmed(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleErase = () => {
        setInputText('');
        setPassword('');
    };

    const handleChange = (e) => {
        const words = e.target.value.split(/\s+/);
        if (words.length <= 200) {
            setInputText(e.target.value);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleReview = () => {
        if (name === '' || inputText === '') {
            alert("Both text and name fields must be filled out.");
            return;
        }
        setIsReviewMode(true);
    };

    const handleModify = () => {

        setIsReviewMode(false);
    };


    return (
        <div>
            {isConfirmed ? (
                <p className="w-full p-2 rounded text-[#4d9165]">
                    {t.confirmation_msg}
                </p>
            ) : isReviewMode ? (
                <>
                    <p className="w-full p-2 border rounded">{inputText}</p>
                    <div className="w-full flex justify-between mt-4">
                        <button
                            onClick={handleModify}
                            className="p-2 bg-gray-500 text-white rounded"
                        >
                            {t.modify}
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="p-2 bg-[#4d9165] text-white rounded"
                        >
                            {t.confirm}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <textarea
                        value={inputText}
                        onChange={handleChange}
                        className="w-full p-2 border rounded h-48"
                        placeholder={t.placeholder}
                    />
                    <div className="w-full flex justify-between mt-4">
                        <input
                            type="name"
                            value={name}
                            onChange={handlePasswordChange}
                            className="w-full p-2 border rounded mt-2 placeholder:text-base"
                            placeholder={t.namePlaceholder}
                            required
                        />
                    </div>
                    <div className="w-full flex justify-between mt-4">
                        <button
                            onClick={handleReview}
                            type="review"
                            className="w-full p-2 bg-[#6d1c22] text-white rounded mt-2"
                        >
                            {t.review}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PrayerRequest;