import React, { useState } from 'react';
import { FaCircle, FaStar, FaHeart, FaTree, FaBell, FaSnowflake, FaGift, FaHollyBerry, FaSleigh, FaSnowman } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const OrnamentDecoration = ({ onComplete }) => {
    const { language } = useLanguage();
    const [shape, setShape] = useState('snowflake');
    const [iconColor, setIconColor] = useState('#ffffff');
    const [backgroundColor, setBackgroundColor] = useState('#d54444');
    const [pattern, setPattern] = useState('solid');

    // const handleComplete = () => {
    //     const secretMessage = language === 'en' ? 'Your secret message is: Merry Christmas!' : '당신의 비밀 메시지는: 메리 크리스마스!';
    //     onComplete(secretMessage);
    // };
    const getSecretMessage = () => {
        const colorDifference = Math.abs(parseInt(iconColor.replace('#', ''), 16) - parseInt(backgroundColor.replace('#', ''), 16));
        const messages = {
            en: [
                'You are a star!',
                'Merry Christmas!',
                'Stay warm!',
                'Ring the bells!',
                'Let it snow!',
                'Gifts are coming!',
                'Ho! ho! ho!',
                'Sleigh all day!',
                'Happy Holidays',
                'Shine bright!',
                'Peace be with you!',
                'Christ is born!'
            ],
            ko: [
                '당신은 별이에요!',
                '메리 크리스마스!',
                '따뜻하게 입어요!',
                '종을 울려요!',
                '눈이 내려요!',
                '선물이 와요!',
                '호! 호! 호!',
                '썰매를 타요!',
                '행복한 연말 보내세요!',
                '밝게 빛나요!',
                '평화가 가득하기를!',
                '아기 예수님이 탄생했어요!'
            ]
        };

        let index = 0;
        if (shape === 'star') index = 0;
        else if (shape === 'heart') index = 1;
        else if (shape === 'tree') index = 2;
        else if (shape === 'bell') index = 3;
        else if (shape === 'snowflake') index = 4;
        else if (shape === 'gift') index = 5;
        else if (shape === 'hollyberry') index = 6;
        else if (shape === 'sleigh') index = 7;
        else if (shape === 'snowman') index = 8;

        if (colorDifference > 5000000) index += 1;
        if (pattern === 'striped') index += 2;
        else if (pattern === 'polka-dot') index += 3;
        else if (pattern === 'sparkle') index += 4;
        else if (pattern === 'plaid') index += 5;

        return messages[language][index % messages[language].length];
    };

    const handleComplete = () => {
        const secretMessage = getSecretMessage();
        onComplete(secretMessage);
    };

    const renderShapeIcon = () => {
        const iconProps = { className: 'ornament-icon', color: iconColor };
        switch (shape) {
            case 'star':
                return <FaStar {...iconProps} />;
            case 'heart':
                return <FaHeart {...iconProps} />;
            case 'tree':
                return <FaTree {...iconProps} />;
            case 'bell':
                return <FaBell {...iconProps} />;
            case 'snowflake':
                return <FaSnowflake {...iconProps} />;
            case 'gift':
                return <FaGift {...iconProps} />;
            case 'hollyberry':
                return <FaHollyBerry {...iconProps} />;
            case 'sleigh':
                return <FaSleigh {...iconProps} />;
            case 'snowman':
                return <FaSnowman {...iconProps} />;
            default:
                return null;
        }
    };

    const translations = {
        en: {
            decorateOrnament: 'Secret Message Ornament',
            shape: 'Shape',
            shapeColor: 'Shape Color',
            baseColor: 'Base Color',
            pattern: 'Pattern',
            complete: 'reveal message',
            star: 'Star',
            heart: 'Heart',
            tree: 'Tree',
            bell: 'Bell',
            snowflake: 'Snowflake',
            gift: 'Gift',
            hollyberry: 'Holly Berry',
            sleigh: 'Sleigh',
            snowman: 'Snowman',
            solid: 'Solid',
            striped: 'Striped',
            polkaDot: 'Polka Dot',
            sparkle: 'Sparkle',
            plaid: 'Plaid',
            message: "Decorate the ornament to reveal a secret message. hint: 12 secrets are hiding."
        },
        ko: {
            decorateOrnament: '비밀을 품은 트리 장식',
            shape: '아이템',
            shapeColor: '아이템 색상',
            baseColor: '바탕 색상',
            pattern: '무늬',
            complete: '비밀 찾기',
            star: '별',
            heart: '하트',
            tree: '나무',
            bell: '종',
            snowflake: '눈송이',
            gift: '선물',
            hollyberry: '호랑가시나무 열매',
            sleigh: '썰매',
            snowman: '눈사람',
            wreath: '화환',
            solid: '단색',
            striped: '줄무늬',
            polkaDot: '물방울 무늬',
            sparkle: '반짝이',
            plaid: '격자 무늬',
            message: "트리 장식을 꾸며 비밀 메시지를 찾아내세요. 힌트: 12개의 비밀이 숨겨져 있어요."
        }
    };

    const t = translations[language];

    return (
        <div className="ornament-decoration p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">{t.decorateOrnament}</h2>
            <p>{t.message}</p>
            <div className="controls space-y-4">
                <label className="block">
                    {t.shape}:
                    <select value={shape} onChange={(e) => setShape(e.target.value)} className="ml-2 p-2 border rounded">
                        <option value="star">{t.star}</option>
                        <option value="heart">{t.heart}</option>
                        <option value="tree">{t.tree}</option>
                        <option value="bell">{t.bell}</option>
                        <option value="snowflake">{t.snowflake}</option>
                        <option value="gift">{t.gift}</option>
                        <option value="hollyberry">{t.hollyberry}</option>
                        <option value="sleigh">{t.sleigh}</option>
                        <option value="snowman">{t.snowman}</option>
                    </select>
                </label>
                <div className="flex space-x-4">
                    <label className="block">
                        {t.shapeColor}:
                        <input 
                            type="color" 
                            value={iconColor} 
                            onChange={(e) => setIconColor(e.target.value)} 
                            className="ml-2 p-1 border rounded"
                        />
                    </label>
                    <label className="block">
                        {t.baseColor}:
                        <input 
                            type="color" 
                            value={backgroundColor} 
                            onChange={(e) => setBackgroundColor(e.target.value)} 
                            className="ml-2 p-1 border rounded"
                        />
                    </label>
                </div>
                <label className="block">
                    {t.pattern}:
                    <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="ml-2 p-2 border rounded">
                        <option value="solid">{t.solid}</option>
                        <option value="striped">{t.striped}</option>
                        <option value="polka-dot">{t.polkaDot}</option>
                        <option value="sparkle">{t.sparkle}</option>
                        <option value="plaid">{t.plaid}</option>
                    </select>
                </label>
            </div>
            <div className="mt-8 flex justify-center">
                <div className={`ornament-preview ornament ${pattern} flex items-center justify-center w-32 h-32 rounded-full`} style={{ backgroundColor }}>
                    {renderShapeIcon()}
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <button onClick={handleComplete} className="px-4 py-2 bg-[#f3eeda] text-[#6d1c22] rounded">{t.complete}</button>
            </div>
        </div>
    );
};

export default OrnamentDecoration;