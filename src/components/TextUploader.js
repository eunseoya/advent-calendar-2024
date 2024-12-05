import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import TextDisplayer from './TextDisplayer';
import {useLanguage} from '../context/LanguageContext';

const TextUploader = ({ day, submittedText, setSubmittedText }) => {
    const { language } = useLanguage();
    const [inputText, setInputText] = useState('');
    const [password, setPassword] = useState('');
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    
    const translations = {
        en: {
            placeholder: "Enter your text here (max 200 words)",
            passwordPlaceholder: "Enter name to edit text later",
            modify: "Modify",
            confirm: "Confirm",
            review: "Review"
        },
        ko: {
            placeholder: "여기에 추억을 써주세요 (최대 200 단어)",
            passwordPlaceholder: "수정을 위해 이름을 입력하세요",
            modify: "수정",
            confirm: "제출하기",
            review: "확인"
        }
    };

    const t = translations[language];

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, 'submissions'), {
                day,
                text: inputText,
                password,
                timestamp: new Date(),
            });
            setSubmittedText(inputText);
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
        if (password === '' || inputText === '') {
            alert("Both text and password fields must be filled out.");
            return;
        }
        setIsReviewMode(true);
    };

    const handleModify = () => {

        setIsReviewMode(false);
    };


    return (
        <>
            {isConfirmed ? (
                <TextDisplayer/>
            ) : (
                <>
                    {submittedText ? (
                        <>
                        </>
                    ) : (
                        <>
                            {isReviewMode ? (
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
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="w-full p-2 border rounded mt-2 placeholder:text-base"
                                            placeholder={t.passwordPlaceholder}
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
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default TextUploader;