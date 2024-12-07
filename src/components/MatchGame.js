import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {  collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js'; // Adjust the import based on your Firebase setup

const MatchGame = () => {
    const [gameState, setGameState] = useState('start');
    const [message, setMessage] = useState('');
    const [choices, setChoices] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const { language } = useLanguage();
    const translations = {
        en: {
            instructions: "One cold night on the last day of December, Little Match Girl is selling matches on the street. Survive through the night until the year is over.",
            restart: "Restart 🔄",
            continue: "Continue ➡️",
            matchgirl: "Little Match Girl ",
            placeholder: " [your name]",
            survived: "survived",   
            hour0_msg: "It's midnight, and you're still selling matches on the street. But it's gotten too cold.",

            hour0_choice_1: "Use all matches to warm up 🔥🔥🔥",
            hour0_choice_1_msg: "After using all the matches, you die from hypothermia",
            hour0_choice_2: "Use matches one by one to keep warm 🔥",
            hour0_choice_2_msg: "After accidentally lighting all matches, you die from hypothermia",
            hour0_choice_3: "Endure the cold and keep selling the matches 💪",
            hour0_choice_4: "Go into a shop 🛍️",
            hour0_choice_4_msg: "The shop owner takes your matches and kicks you out. You die from hypothermia",
            
            hour2_msg: "It's now 2 AM. Fortunately, you've sold a lot and have two matches left. A suspicious man approaches... but you can't see his face clearly.",
            hour2_choice_1: "Ignore the man and wait for the next person 🙅",
            hour2_choice_1_msg: "You wait, but no one else comes, and you die from hypothermia",
            hour2_choice_2: "Leave the place because bad vibes 💨",
            hour2_choice_3: "Light a match to see his face 👀",
            hour2_choice_3_msg: "While you're picking up the match you dropped, the man leaves. No one else comes, and you die from hypothermia",
            hour2_choice_4: "Give him a match 🤝",
            
            hour4a_msg: "It's now 4AM. You're looking for a safe spot.",
            hour4a_choice_1: "Go under the bridge ⛩",
            hour4a_choice_1_msg: "The bridge collapses suddenly due to construction, and you die",
            hour4a_choice_2: "Walk around and come back to the street ↩️",
            hour4a_choice_3: "Go into the alley 🐾",
            hour4a_choice_3_msg: "Stay on main roads at night. You get mugged and die",
            
            hour4b_msg: "It's now 4AM. The man says the matches have special powers.",
            hour4b_choice_1: "Keep the last match without selling it 💎",
            hour4b_choice_2: "Special power? I guess I should try lighting one now...✨",
            hour4b_choice_2_msg: "Can you turn off the light? Faker's illusion appears, blows the match out, and disappears. You die from hypothermia",
            hour4b_choice_3: "Then you should at least buy one!💵",
            hour4b_choice_3_msg: "Don't be greedy. The man buys the last match and you are left without any matches. You die from hypothermia",
            
            hour6_msg: "Dawn is breaking. The last match suddenly lights up, and a vision appears, speaking to you. The voice is familiar...",
            hour6_choice_1: "Grandma ___...? (Mom's side)",
            hour6_choice_2: "Grandma ___...? (Dad's side)",
            hour6_choice_2_msg: "It was your maternal grandma. She is disappointed and disappears. You die from hypothermia",
            hour8_msg: "Your grandmother guides you to a church that serves breakfast after early morning prayer🙏 Happy new year! Write your name below to let Gloria know."
        },
        ko: {
            instructions: "12월의 마지막날 밤, 찬바람이 몰아치는 길거리에서 사람들에게 성냥을 파는 성냥팔이 소녀. 그 소녀가 되어 새해까지 살아남아보세요.",
            restart: "다시 도전 🔄",
            continue: "계속 ➡️",
            matchgirl: "성냥팔이 ",
            placeholder: "   [이름]",
            survived: "생존",
            hour0_msg: "당신은 자정까지 거리에서 성냥을 팔고 있다. 하지만 이젠 너무 추워졌다.",
            hour0_choice_1: "성냥을 다 써서 따뜻해진다 🔥🔥🔥",
            hour0_choice_1_msg: "모든 성냥을 소진한 뒤 추위로 사망",
            hour0_choice_2: "성냥을 차례차례 하나씩 써서 약간의 온기를 유지한다 🔥",
            hour0_choice_2_msg: "하나씩 쓰려다 전부 불이 붙어버려 성냥을 소진한 뒤 추위로 사망",
            hour0_choice_3: "추위를 견디고 계속 판다 💪",
            hour0_choice_4: "옆 상점에 들어간다 🛍️",
            hour0_choice_4_msg: "상점 주인이 당신의 성냥을 빼앗고 거리로 내쫓는다. 추위로 사망",

            hour2_msg: "이제 두시다. 다행히 많이 팔려서 성냥 두개비가 남았다. 어쩐지 수상한 사람이 다가온다.. 하지만 얼굴이 잘 보이지 않는다.",
            hour2_choice_1: "사람을 무시하고 다음 사람을 기다린다 🙅",
            hour2_choice_1_msg: "기다렸지만 다른 사람은 오지 않고 추위로 사망",
            hour2_choice_2: "무섭기 때문에 일단 피한다 💨",
            hour2_choice_3: "얼굴을 확인하기 위해 성냥 한개비를 킨다 👀",
            hour2_choice_3_msg: "실수로 성냥을 떨어뜨려 줍는 사이에 남자는 사라졌다. 다른 사람은 오지 않고 추위로 사망",
            hour2_choice_4: "성냥을 그냥 준다 🤝",

            hour4a_msg: "새벽 4시. 자리를 피한 당신은 안전한 곳을 찾아 나선다.",
            hour4a_choice_1: "다리 밑으로 들어간다 ⛩",
            hour4a_choice_1_msg: "다리 부실공사로 갑자기 무너져 사망",
            hour4a_choice_2: "한참을 돌다가 다시 거리로 나온다 ↩️",
            hour4a_choice_3: "골목으로 들어간다 🐾",
            hour4a_choice_3_msg: "늦은 밤 골목길에선 안심귀가서비스를 이용하자. 괴한을 만나 사망",
            
            hour4b_msg: "새벽 4시. 남자는 성냥에 특별한 힘이 있다고 말한다.",
            hour4b_choice_1: "하나 남은 성냥을 팔지 않고 간직하기로 한다 💎",
            hour4b_choice_2: "특별한 힘? 이제는 성냥을 켜볼까...✨",
            hour4b_choice_2_msg: "불 좀 꺼줄래? 페이커의 환상이 나타나 불을 끄고 사라진다. 추위로 사망",
            hour4b_choice_3: "그럼 하나는 사가세요!💵",
            hour4b_choice_3_msg: "괜한 욕심은 내지 말자. 남은 성냥이 없어 추위로 사망",
            hour6_msg: "동이 튼다. 마지막 성냥에 갑자기 불이 붙고, 어떤 환상이 나타나 말을 건다. 익숙한 목소리인데…",
            hour6_choice_1: "외할머니…?",
            hour6_choice_2: "친할머니…?",
            hour6_choice_2_msg: "외할머니였다. 삐지신 할머니는 사라지고 당신은 추위로 사망",
            hour8_msg: "할머니는 당신을 근처 새벽기도 후 아침을 주는 교회로 인도한다🙏 당신은 무사히 아침까지 생존했다! 아래에 이름을 적어 은서에게 알려주세요."
        }
    };
    const t = translations[language];

    const startGame = () => {
        setGameState('start');
        setMessage(t.instructions);
        setChoices([
            { text: t.continue, action: hour0 }
        ]);
    };

    const hour0 = () => {
        setGameState('hour0');
        setMessage(t.hour0_msg);
        setChoices([
            { text: `1. ${t.hour0_choice_1}`, action: () => endGame(t.hour0_choice_1_msg) },
            { text: `2. ${t.hour0_choice_2}`, action: () => endGame(t.hour0_choice_2_msg) },
            { text: `3. ${t.hour0_choice_3}`, action: hour2 },
            { text: `4. ${t.hour0_choice_4}`, action: () => endGame(t.hour0_choice_4_msg) }
        ]);
    };

    const hour2 = () => {
        setGameState('hour2');
        setMessage(t.hour2_msg);
        setChoices([
            { text: `1. ${t.hour2_choice_1}`, action: () => endGame(t.hour2_choice_1_msg) },
            { text: `2. ${t.hour2_choice_2}`, action: hour4a },
            { text: `3. ${t.hour2_choice_3}`, action: () => endGame(t.hour2_choice_3_msg) },
            { text: `4. ${t.hour2_choice_4}`, action: hour4b }
        ]);
    };

    const hour4a = () => {
        setGameState('hour4a');
        setMessage(t.hour4a_msg);
        setChoices([
            { text: `1. ${t.hour4a_choice_1}`, action: () => endGame(t.hour4a_choice_1_msg) },
            { text: `2. ${t.hour4a_choice_2}`, action: hour6 },
            { text: `3. ${t.hour4a_choice_3}`, action: () => endGame(t.hour4a_choice_3_msg) }
        ]);
    };

    const hour4b = () => {
        setGameState('hour4b');
        setMessage(t.hour4b_msg);
        setChoices([
            { text: `1. ${t.hour4b_choice_1}`, action: hour6 },
            { text: `2. ${t.hour4b_choice_2}`, action: () => endGame(t.hour4b_choice_2_msg) },
            { text: `3. ${t.hour4b_choice_3}`, action: () => endGame(t.hour4b_choice_3_msg) }
        ]);
    };

    const hour6 = () => {
        setGameState('hour6');
        setMessage(t.hour6_msg);
        setChoices([
            { text: `1. ${t.hour6_choice_1}`, action: hour8 },
            { text: `2. ${t.hour6_choice_2}`, action: () => endGame(t.hour6_choice_2_msg) }
        ]);
    };

    const hour8 = () => {
        setGameState('hour8');
        setMessage(t.hour8_msg);
        setChoices([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'results'), {
                day: 6,
                name: playerName,
                result: "success",
                timestamp: new Date()
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const endGame = (message) => {
        setGameState('end');
        setMessage(message + " 💀");
        setChoices([
            { text: t.restart, action: startGame }
        ]);
    };

    useEffect(() => {
        startGame();
    }, [language]);

    useEffect(() => {
        if (gameState === 'start') {
            startGame();
        } else if (gameState === 'hour0') {
            hour0();
        } else if (gameState === 'hour2') {
            hour2();
        } else if (gameState === 'hour4a') {
            hour4a();
        } else if (gameState === 'hour4b') {
            hour4b();
        } else if (gameState === 'hour6') {
            hour6();
        } else if (gameState === 'hour8') {
            hour8();
        }
    }, [gameState, language]);

    return (
        <div>
            <p>{message}</p>
            <div className="mt-8">
                {choices.map((choice, index) => (
                    <div key={index} className="mb-2">
                        <button
                            className="text-left focus:outline-none w-full"
                            onClick={choice.action}
                        >
                            {choice.text}
                        </button>
                    </div>
                ))}
            </div>
            {gameState === 'hour8' && !submitted && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="playerName">{t.matchgirl}</label>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder={t.placeholder}
                        required
                        style={{ width: '100px', marginRight: '10px' }} 
                    />
                    <button type="submit" style={{ color: 'white', backgroundColor: '#4f9065', border: '5px solid #4f9065', borderRadius: '5px' }}>{t.survived}</button>
                </form>
            )}
            {submitted && <p>{t.matchgirl} {playerName} {t.survived}🎉</p>}
        </div>
    );
};

export default MatchGame;
