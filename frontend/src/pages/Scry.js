import React, { useState, useEffect } from 'react';
import { scry } from '../api';
import CardButton from '../components/card';

const Scry = () => {
    
    const [card, setCard] = useState([]);

    useEffect(() => {
      const getCards = async () => {
        
        console.log("Scrying...");
        console.log("scryfall_id:");
        const scryfall_id = window.location.pathname.split("/").pop();
        console.log(scryfall_id);
        const response = await scry(scryfall_id);
        console.log("Scry response:");
        console.log(response);
        console.log(response.data);
        
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
