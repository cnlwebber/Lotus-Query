import React, { useState, useEffect } from 'react';
import CardButton from '../components/card.js';
import { randomCard } from '../api.js';

const Random = () => {
  const [randCards, setRandCard] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await randomCard();
      console.log(response.data)
      setRandCard(response.data);
    };
    getCards();
  }, []);

  return (
    <div className="randomCards">
      {randCards.map(card => (
        <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
      ))}
    </div>
  );
};

export default Random;