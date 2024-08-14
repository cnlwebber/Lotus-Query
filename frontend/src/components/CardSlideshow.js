import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardButton from '../components/card.js';
import { nRandomCards } from '../api.js';

const NUM_OF_CARDS = 20;

const CardSlideshow = () => {
    const [randCards, setRandCard] = useState([]);

    useEffect(() => {
        const getCards = async () => {
            const response = await nRandomCards(NUM_OF_CARDS);
            console.log(response.data)
            setRandCard(response.data);
        };
        getCards();
    }, []);
    
    // modified source code:
    // https://codepen.io/studiojvla/pen/qVbQqW
    return (
        <div>
        <div class="cardSlideshow">
            <div class="cardSlideshowTrack">
                {randCards.map(card => (
                    <div className="randomCard">
                        <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
                    </div>
                ))}
                {randCards.map(card => (
                    <div className="randomCard">
                        <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default CardSlideshow;
