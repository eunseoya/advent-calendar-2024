// src/components/YouTubeEmbed.js
import React from 'react';

const YouTubeEmbed = ({ videoId }) => {
    return (
        <div className="w-full max-w-2xl aspect-w-16 aspect-h-9">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&mute=0&showinfo=0&rel=0`}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
            />
        </div>
    );
};

export default YouTubeEmbed;