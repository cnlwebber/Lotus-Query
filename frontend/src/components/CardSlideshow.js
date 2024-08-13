import React from 'react';
import { Link } from 'react-router-dom';
import RandomCard from '../components/RandomCard.js';

const CardSlideshow = () => {
    const cards = [];
    for (var i = 0; i < 20; i++) {
        cards.push(<RandomCard />);
    }

    // modified source code:
    // https://codepen.io/studiojvla/pen/qVbQqW
    return (
        <div class="cardSlideshow">
            <div class="cardSlideshowTrack">
                {cards}
            </div>
        </div>
    );
};

export default CardSlideshow;
