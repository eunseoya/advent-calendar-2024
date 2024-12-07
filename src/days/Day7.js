import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';
import PhotoUploader from '../components/PhotoUploader';

const Day7 = () => {
    const { language } = useLanguage();

    const text = {
        en: {
            title: "O Christmas Tree: Worldwide🎄🌍",
            message: "What does your tree look like? Capture the moment in front of a Christmas tree. Camera shy? No worries, just share the tree.",
            screenshot: "From fancy mall trees to cozy decorations, all trees are welcome. Bonus for creativity!"
        },
        ko: {
            title: "온 세상의 트리를 모아줘🎄🌍",
            message: "너의 트리가 궁금해! 크리스마스 트리 앞에 서서 사진을 찍어주세요. 얼굴이 나오는게 싫다면 트리만 찍어도 좋아요.",
            screenshot: "큰 전나무도 좋고, 아담한 장식 트리도 좋아요. 창의적인 트리는 보너스 점수!"
        }
    };

    return (
        <DayLayout
            dayNumber={7}
            verseReference="matthew+1:22-23"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-4">{text[language].title}</h1>
                    <div className="flex mb-4 justify-center">
                    <img src="https://i.ibb.co/j3T9r8c/day7-tree.jpg" alt="day7-tree" border="0" className="w-1/2 md:w-1/3 lg:w-1/4"></img>
                    </div>
                    {/* <a href="https://ibb.co/fr2VxXh"><img src="https://i.ibb.co/SVPD36h/day7-tree.jpg" alt="day7-tree" border="0"></a> */}
                    <p>{text[language].message}</p>
                    <p>{text[language].screenshot}</p>
                    <PhotoUploader /> 
                </div>
            </div>
        </DayLayout>
    );
};

export default Day7;
