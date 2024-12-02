// src/components/AudioPlayer.js
import React from 'react';

const AudioPlayer = ({ src }) => {
    const handleError = (e) => {
        console.error('Audio error:', e);
    };

    return (
        <audio 
            controls 
            className="w-full max-w-md"
            onError={handleError}
        >
            <source src={process.env.PUBLIC_URL + src} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

export default AudioPlayer;