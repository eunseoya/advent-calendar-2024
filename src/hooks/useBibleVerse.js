// src/hooks/useBibleVerse.js
import { useState, useEffect } from 'react';

const useBibleVerse = (reference) => {
    const [verse, setVerse] = useState('');
    const [verseRef, setVerseRef] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // https://bible-api.com/BOOK+CHAPTER:VERSE
        fetch(`https://bible-api.com/${reference}`)
            .then(response => response.json())
            .then(data => {
                setVerse(data.text);
                // Format reference as "Book Chapter:Verse"
                setVerseRef(`${data.reference}`);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [reference]);

    return { verse, verseRef, loading, error };
};

export default useBibleVerse;