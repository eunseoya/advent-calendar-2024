// src/components/DayLayout.js
import React from 'react';
import useBibleVerse from '../hooks/useBibleVerse';

const DayLayout = ({ dayNumber, children, verseReference }) => {
    const { verse, verseRef, loading, error } = useBibleVerse(verseReference);

    // const verse = "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."
    // const verseRef = "sample"
    // const loading = false
    // const error = false
    
    return (
        <div className="flex flex-col min-h-[calc(100vh-8rem)] bg-[#fdffff] rounded-lg p-2 sm:p-4 mx-2 sm:mx-4">
            <header className="text-center p-2 sm:p-4 bg-[#f3eedb] text-[#6d1c22] rounded-t-lg">
                <h1 className="text-xl sm:text-2xl">Day {dayNumber}</h1>
            </header>

            <main className="flex-grow p-2 sm:p-4">
                {children}
            </main>

            <footer className="text-center p-3 sm:p-4 bg-[#f3eedb] text-[#6d1c22] rounded-b-lg">
                <p className="text-sm sm:text-base mb-1">
                    {loading ? "Loading verse..." : error ? "Error loading verse" : verse}
                </p>
                {!loading && !error && verseRef && (
                    <p className="text-sm sm:text-base">
                        {verseRef}
                    </p>
                )}
            </footer>
        </div>
    );
};

export default DayLayout;