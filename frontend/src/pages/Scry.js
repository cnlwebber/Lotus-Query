import React, { useState, useEffect } from 'react';
import { scry } from '../api';
import CardButton from '../components/card';

const Scry = () => {
    
    const [card, setCard] = useState([]);

    useEffect(() => {
      const getCards = async () => {
        const scryfall_id = window.location.pathname.split("/").pop();
        const response = await scry(scryfall_id);
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
