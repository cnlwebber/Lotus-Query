import React, { useState, useEffect } from 'react';
import { scry } from '../api';
import CardButton from '../components/card';

const Scry = () => {
    
    const [card, setCard] = useState([]);

    useEffect(() => {
      const getCards = async () => {
        const response = await scry();
      
        setCard(response.data);
      };
      getCards();
    }, []);

    return (
        <div className="homePage">
        {card.map(card => (
            <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
      ))}
        </div>
    );
};

export default Scry;
