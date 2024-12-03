
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const FormLayout = () => {
    const { language } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const formID = ""
    const translations = {
        en: {
            formTitle: 'Contact Us',
            nameLabel: 'Name:',
            emailLabel: 'Email:',
            submitButton: 'Submit',
            successMessage: 'Thank you for contacting us!',
            failureMessage: 'Submission failed. Please try again.'
        },
        ko: {
            formTitle: '문의하기',
            nameLabel: '이름:',
            emailLabel: '이메일:',
            submitButton: '제출하기',
            successMessage: '문의해 주셔서 감사합니다!',
            failureMessage: '제출에 실패했습니다. 다시 시도해 주세요.'
        }
    };

    const t = translations[language];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formUrl = 'https://docs.google.com/forms/d/e/'${formID}'/formResponse';
        const formData = new FormData();
        formData.append('entry.588570906', name);
        formData.append('entry.1006465292', email);
        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            if (response.ok || response.type === 'opaque') {
                setMessage(t.successMessage);
                setSubmitted(true);
            } else {
                setMessage(t.failureMessage);
            }
        } catch (error) {
            setMessage(t.failureMessage);
        }
    };

    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-md">
            <h2 className="text-xl mb-4">{t.formTitle}</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        {t.nameLabel}
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                    <label className="block mb-4">
                        {t.emailLabel}
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                    <button type="submit" className="w-full bg-[#4f9065] text-white p-2 rounded">{t.submitButton}</button>
                </form>
            ) : (
                <p className="mt-4 text-center">{message}</p>
            )}
        </div>
    );
};

export default FormLayout;