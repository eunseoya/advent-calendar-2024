import React, { useState } from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';
import Carousel from '../components/Carousel';
import PrayerRequest from '../components/PrayerRequest';

const Day8 = () => {
    const { language } = useLanguage();
    const translations = {
        en: {
            title: "Happy Sunday Gallery",
            day3_title: "Warm words for a Winter's day",
            day5_title: 'Favorite Christmas Memory',
            day7_title: 'O Christmas Tree: Worldwide',
            prayer_title: 'Prayer Requests',
            prayer_instruction: 
            "I'm thinking of you and want to pray for you. If there's anything on your mind, \
                big or small, please share it here."
        },
        ko: {
            title: "즐거운 주일 전시회",
            day3_title: "겨울 날의 따뜻한 한마디",
            day5_title: '좋아하는 크리스마스의 추억',
            day7_title: '온 세상의 트리를 모아줘',
            prayer_title: '기도제목',
            prayer_instruction: "여러분을 생각하며 기도하고 싶어요. 고민이나 기도 부탁하고 싶은 것이 있으면 \
                사소한 것이라도 공유해주세요."
        }
    };

    const t = translations[language];
    const [activeTab, setActiveTab] = useState('tab1');

    const day3_images = [ "WHjQ5w2/day3-2.jpg", "f82NFdh/day3-1.jpg", "WP7DKRX/day3-3.png", "KFHBsSC/day3-4.jpg", "Kmc92Wm/day3-5.jpg", "Dk6B4mp/day3-6.png", "1JDzXmh/day3-7.png", "VLcnw0V/day3-8.jpg", "2Mh7y04/day3-9.jpg", "mcmB4t2/day3-10.jpg", "QXzfKQP/day3-11.png", "R0LqxxR/day3-12.jpg", "471tDXN/day3-13.png", "L5cFvfd/day3-14.png", "qy06Spq/day3-15.png", "sjxjXv0/day3-16.png", "zJWbVv2/day3-17.jpg", "jzNqv7s/day3-18.jpg" ];
    const day7_images = ["874KvfL/day7-6.jpg", "86P9MKD/day7-5.jpg", "YBPzJgK/day7-4.jpg", "YDfLzrH/day7-3.png", "j6kwLsB/day7-1.jpg", "HHzkcXS/day7-2.jpg"];

    const day3_image_urls = day3_images.map(image => `https://i.ibb.co/${image}`);
    const day7_image_urls = day7_images.map(image => `https://i.ibb.co/${image}`);
    
    return (
        <DayLayout
            dayNumber={8}
            verseReference="isaiah+9:6"
        >   
        <div className="w-full flex items-center justify-center mt-4 md:p-16 lg:p-24">
        <div className="text-center px-2 md:px-0">
            <h1 className="text-xl font-bold">{t.title}</h1>
            </div>
        </div>
            
            <div className="w-full flex flex-col items-center justify-center p-4 md:p-16 lg:p-24">
                {activeTab === 'tab1' && (
                    <div className="w-full flex flex-col items-center px-2 md:px-0"> 
                    <h2 className="mb-4">{t.day3_title}</h2>
                    <Carousel type="image" items={day3_image_urls} />
                    </div>
                )}
                {activeTab === 'tab2' && (
                    <div className="w-full flex flex-col items-center px-2 md:px-0"> 
                    <h2 className="mb-4">{t.day5_title}</h2>
                    <Carousel type="text" items="submissions" />
                    </div>
                )}
                {activeTab === 'tab3' && (
                    <div className="w-full flex flex-col items-center px-2 md:px-0"> 
                    <h2 className="mb-4">{t.day7_title}</h2>
                    <Carousel type="image" items={day7_image_urls} />
                    </div>
                )}
                {activeTab === 'tab4' && (
                    <div className="px-2 md:px-0">
                    <div className="w-full flex flex-col items-center"> 
                    <h2 className="mb-4">{t.prayer_title}</h2>
                    </div>
                    <p className="text-center">{t.prayer_instruction}</p>
                    <div className="mt-4">
                        <PrayerRequest />
                    </div>
                    </div>
                )}
            </div>
            <div className="tabs text-l mb-4 w-full grid grid-cols-4 gap-2 px-2 md:px-0">
                    <button className="w-full p-1 bg-[#f3eeda] text-[#6d1c22] rounded" onClick={() => setActiveTab('tab1')}>Day 3</button>
                    <button className="w-full p-1 bg-[#f3eeda] text-[#6d1c22] rounded" onClick={() => setActiveTab('tab2')}>Day 5</button>
                    <button className="w-full p-1 bg-[#f3eeda] text-[#6d1c22] rounded" onClick={() => setActiveTab('tab3')}>Day 7</button>
                    <button className="w-full p-1 bg-[#f3eeda] text-[#6d1c22] rounded" onClick={() => setActiveTab('tab4')}>🙏</button>
                </div>
        </DayLayout>
    );
};

export default Day8;
