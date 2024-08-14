import React, { useState, useEffect } from 'react';
import { scry } from '../api';
import CardButton from '../components/card';

const Scry = () => {
    
    const [card, setCard] = useState([]);

    useEffect(() => {
      const getCards = async () => {
        
        console.log("Scrying...");
        const scryfall_id = window.location.pathname.split("/").pop();
        console.log(scryfall_id);
        const response = await scry(scryfall_id);
        console.log("Scry response:");
        console.log(response.data);
        
        setCard(response.data);
      };
      getCards();
    }, []);

    return (
      <div className="cardPage">
        
        <div className="cardArea">
        {card.map(card => (
          <div>
            <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
          </div>
        ))}
        </div> {/* cardArea */}

        {card.map(card => (
          <div className="infoArea">
            <h2 className="cardInfoTitle">Card Information</h2>
            <p className="cardManaCost">Mana Cost: {card.mana_cost} </p>
            <p className="cardTotalManaCost">Total Mana Cost: {card.cmc} </p>
            <p className="cardRarity"> Rarity: {card.rarity.toUpperCase()}</p>
            <p className="cardType">Type: {card.type}</p>
          {card.power && card.toughness && (
            <p className="powerToughness">Power/Toughness: {card.power}/{card.toughness}</p>
          )}
            <p className="cardColor">Color: {convertColor(card.color)}</p>
            <p className="cardColorIdentity">Color Identity: {convertColor(card.color_identity)}</p>
            <p className="cardSet">Card Set: {card.set_name} ({card.set_id})</p>
          <p className="legalityTitle">Legality:</p>
          <ul className="legalityList">
            <li className="commander"> Commander: {card.commander.toUpperCase()} </li> 
            <li className="legacy"> Legacy: {card.legacy.toUpperCase()} </li> 
            <li className="modern"> Modern: {card.modern.toUpperCase()} </li> 
            <li className="pauper"> Pauper: {card.pauper.toUpperCase()} </li> 
            <li className="pioneer"> Pioneer: {card.pioneer.toUpperCase()} </li> 
            <li className="standard"> Standard: {card.standard.toUpperCase()} </li> 
            <li className="vintage"> Vintage: {card.vintage.toUpperCase()} </li>  
          </ul>
          {/* SQL Date Format: YYYY-MM-DDTHH:MM:SSSZ */}
          <p className='cardReleaseDate'> Release Date: {card.release_date.substring(0, 10)} </p>
        </div>
        ))}

      </div> /* cardPage */
    );
};

// Convert the color codes to their full names
function convertColor(colorCodes) {
  const colorMap = {
    'W': 'White',
    'U': 'Blue',
    'B': 'Black',
    'R': 'Red',
    'G': 'Green'
  };

  // Split the string into an array of characters and filter out any that are not W, U, B, R, or G
  return colorCodes.split('').filter(code => colorMap.hasOwnProperty(code)).map(code => colorMap[code]).join(', ');
}

export default Scry;
