// scripts/generateDays.js
const fs = require('fs');
const path = require('path');

const template = (dayNumber, verseRef) => `import React from 'react';
import DayLayout from '../components/DayLayout';
import { useLanguage } from '../context/LanguageContext';

const Day${dayNumber} = () => {
    const { language } = useLanguage();

    return (
        <DayLayout
            dayNumber={${dayNumber}}
            verseReference="${verseRef}"
        >
            <div className="w-full flex items-center justify-center p-8 md:p-16 lg:p-24">
                <p>Coming Soon...</p>
                {/* Add content for Day ${dayNumber} */}
            </div>
        </DayLayout>
    );
};

export default Day${dayNumber};
`;

const verses = [
    "1corinthians+13:4-7",
    "matthew 2:10",
    "matthew+1:22-23",
    "john 1:29",
    "romans 12:10",
    "luke 1:35",
    "luke 1:14",
    "isaiah+9:6",
    "luke+2:20",
    "luke 6:38",
    "james 1:17",
    "john 1:14",
    "1 peter 1:8-9",
    "1 john 4:9",
    "philippians+2:5-11",
    "malachi 3:1",
    "matthew 6:20",
    "luke 2:10",
    "2 corinthians 13:11",
    "john 1:29",
    "psalm 107:1",
    "luke 2:7",
    "john 3:16"
];

const generateDays = () => {
    const daysDir = path.join(__dirname, '..', 'src', 'days');

    // Create days directory if it doesn't exist
    if (!fs.existsSync(daysDir)) {
        fs.mkdirSync(daysDir);
    }

    // Generate files for days 1-25
    for (let i = 3; i <= 25; i++) {
        const fileName = path.join(daysDir, `Day${i}.js`);
        const verseRef = verses[i - 1] || `luke+2:${i}`; // Fallback verse reference
        fs.writeFileSync(fileName, template(i, verseRef));
        console.log(`Created Day${i}.js`);
    }
};

generateDays();