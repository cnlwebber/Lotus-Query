import React, { useState, useEffect } from 'react';
import CardButton from './card.js';
import { nRandomCards } from '../api.js';

const RandomCard = () => {
  const [randCards, setRandCard] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await nRandomCards(5);
      console.log(response.data)
      setRandCard(response.data);
    };
    getCards();
  }, []);


  return (
    <div className="randomCard">
      {randCards.map(card => (
        <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
      ))}
    </div>
  );
};

export default RandomCard;
