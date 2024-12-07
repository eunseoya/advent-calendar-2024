import React, { useState, useContext } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SubscriptionForm = ({ onClose }) => {
    const { language } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const translations = {
        en: {
            subscribeTitle: 'Receive daily reminders 💌',
            nameLabel: 'Name:',
            emailLabel: 'Email:',
            subscribeButton: 'Sign me up',
            successMessage: 'See you at your inbox :)',
            failureMessage: 'Failed :\(. Please let gloria know.'
        },
        ko: {
            subscribeTitle: '잊지 않게 편지가 찾아가요 💌',
            nameLabel: '이름:',
            emailLabel: '이메일:',
            subscribeButton: '구독하기',
            successMessage: '메일함에서 만나요 :)',
            failureMessage: '구독에 실패했어요ㅠ 은서에게 알려주세요.'
        }
    };

    const t = translations[language];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScfqgcnb4KMzHlhjcooRpmgmMYobuKFn9LSkzZti0ml7je6Jg/formResponse';
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
                setSubscribed(true);
            } else {
                setMessage(t.failureMessage);
            }
        } catch (error) {
            setMessage(t.failureMessage);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg relative w-80 max-w-full">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
                <h2 className="text-xl mb-4">{t.subscribeTitle}</h2>
                {!subscribed ? (
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
                        <button type="submit" className="w-full bg-[#4f9065] text-white p-2 rounded">{t.subscribeButton}</button>
                    </form>
                ) : (
                    <p className="mt-4 text-center">{message}</p>
                )}
            </div>
        </div>
    );
};

export default SubscriptionForm;