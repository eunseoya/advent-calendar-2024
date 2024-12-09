import React, { useState } from 'react';
import DayLayout from '../components/DayLayout';
import AudioPlayer from '../components/AudioPlayer';
import { useLanguage } from '../context/LanguageContext';

const Day2 = () => {
    const { language } = useLanguage();
    const [currentSong, setCurrentSong] = useState(0);
    const [guess, setGuess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const translations = {
        en: {
            correct: "Correct!",
            incorrect: "Not quite! The song was",
            missionComplete: "Mission Complete!",
            yourScore: "Your Score:",
            outOf: "out of",
            perfect: "Perfect score! 🎄",
            great: "Great job! 🎅",
            keepPracticing: "Keep practicing! ⭐",
            guessSong: "Guess the song!",
            submitFinal: "Submit Final Guess",
            submitNext: "Submit & Next",
            song: "Song",
            sendScreenshot: "Unfortunately, Week 1 submissions are closed. Please participate in this week's missions! 🎄"
            //"Send a screenshot to Gloria to track your progress (no account feature yet.. coming soon!)"
        },
        ko: {
            correct: "정답!",
            incorrect: "아쉽네요! 정답은",
            missionComplete: "미션 완료!",
            yourScore: "점수:",
            outOf: "/",
            perfect: "만점! 🎄",
            great: "짱! 🎅",
            keepPracticing: "계속 연습해보자! ⭐",
            guessSong: "노래 제목을 영어로 써주세요",
            submitFinal: "마지막..!",
            submitNext: "확인",
            song: "노래",
            sendScreenshot: "아쉽게도 1주차 미션 참여 기간은 끝났어요. 이번 주 미션에 참여해주세요! 🎄"
            //"진행 상황을 기록하기 위해 스크린샷을 은서에게 보내주세요 (계정은 아직.. 곧 만들 수 있어요)"
        }
    };

    const t = translations[language];
    const songs = [
        { path: '/audio/navidad_feliciano.mp3', title: 'Feliz Navidad' },
        { path: '/audio/jinglebellrock_helms.mp3', title: 'Jingle Bell Rock' },
        { path: '/audio/letitsnow_martin.mp3', title: 'Let It Snow', hint: '()! x3 (just put one)' },
        { path: '/audio/mistletoe_bieber.mp3', title: 'Mistletoe' },
    ];

    const handleGuessSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setShowResult(true);
        
        if (isCorrectGuess()) {
            setScore(prev => prev + 1);
        }

        if (currentSong < songs.length - 1) {
            setTimeout(() => {
                setCurrentSong(prev => prev + 1);
                setGuess('');
                setShowResult(false);
                setLoading(false);
            }, 2000);
        } else {
            setTimeout(() => {
                setIsComplete(true);
            }, 2000);
        }
    };

    const isCorrectGuess = () => {
        const correctTitle = songs[currentSong].title.toLowerCase();
        const userGuess = guess.toLowerCase().trim();
        if (correctTitle === 'jingle bell rock' && (userGuess === 'jingle bell rock' || userGuess === 'jingle bell')) {
            return true;
        }
        return userGuess === correctTitle;
    };

    if (isComplete) {
        return (
            <DayLayout dayNumber={2} verseReference="luke+2:14">
                <div className="w-full flex flex-col items-center justify-center gap-4 p-8 text-center">
                    <h2 className="text-2xl font-bold text-[#6d1c22] mb-4">{t.missionComplete}</h2>
                    <p className="text-xl mb-2">{t.yourScore} {score} {t.outOf} {songs.length}</p>
                    <p className="text-lg">
                        {score === songs.length ? t.perfect : 
                         score >= songs.length/2 ? t.great : 
                         t.keepPracticing}
                    </p>
                    <p>{t.sendScreenshot}</p>
                </div>
            </DayLayout>
        );
    }

    return (
        <DayLayout dayNumber={2} verseReference="psalm+96:1-2">
            <div className="w-full flex flex-col items-center justify-center gap-4 p-8">
                <div className="text-center mb-4">
                    <p className="text-[#6d1c22]">{t.song} {currentSong + 1} {t.outOf} {songs.length}</p>
                </div>
                
                {songs[currentSong] && (
                    <AudioPlayer
                        key={currentSong}
                        src={songs[currentSong].path}
                    />
                )}

                {songs[currentSong].hint && (
                    <div className="text-center text-sm text-gray-500">
                        {songs[currentSong].hint}
                    </div>
                )}

                {showResult ? (
                    <div className={`text-center p-4 rounded ${isCorrectGuess() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrectGuess() ? 
                            `🎄 ${t.correct}` : 
                            `❌ ${t.incorrect} "${songs[currentSong].title}"`
                        }
                    </div>
                ) : (
                    <form onSubmit={handleGuessSubmit} className="w-full max-w-md flex flex-col items-center gap-2">
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder={t.guessSong}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-[#4d9165]"
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-[#4d9165] text-white rounded"
                        disabled={loading}
                    >
                        {currentSong === songs.length - 1 ? t.submitFinal : t.submitNext}
                    </button>
                </form>
                )}
            </div>
        </DayLayout>
    );
};

export default Day2;