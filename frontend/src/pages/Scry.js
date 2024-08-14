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
      <div className="cardPageWrapper">
      <h1> Card Information </h1>
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
            <table>
              <tr>
                <th> Name </th>
                <td> {card.name} </td>
              </tr>
              <tr>
                <th> Set </th>
                <td> {card.set_name} </td>
              </tr>
              <tr>
                <th> Set Code </th>
                <td> {card.set_id} </td>
              </tr>
              <tr>
                <th> Release Date </th>
                <td> {card.release_date.substring(0, 10)} </td>
              </tr>
              <tr>
                <th> Mana Cost </th>
                <td> {card.mana_cost} </td>
              </tr>
              <tr>
                <th> CMC </th>
                <td> {card.cmc} </td>
              </tr>
              <tr>
                <th> Card Type </th>
                <td> {card.type} </td>
              </tr>
              {card.power && card.toughness && (
              <tr>
                <th> Creature Stats </th>
                <td> {card.power}/{card.toughness} </td>
              </tr>)}
              <tr>
                <th> Color(s) </th>
                <td> {convertColor(card.color)} </td>
              </tr>
              <tr>
                <th> Color Identity </th>
                <td> {convertColor(card.color_identity)} </td>
              </tr>
              <tr>
                <th> Rarity </th>
                <td> {card.rarity.toUpperCase()} </td>
              </tr>
            </table>
            <h2> Legal Rulings: </h2>
            <table>
              <tr>
                <th> Commander </th>
                <td> {card.commander.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Legacy </th>
                <td> {card.legacy.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Modern </th>
                <td> {card.modern.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Pauper </th>
                <td> {card.pauper.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Pioneer </th>
                <td> {card.pioneer.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Standard </th>
                <td> {card.standard.toUpperCase()} </td>
              </tr>
              <tr>
                <th> Vintage </th>
                <td> {card.vintage.toUpperCase()} </td>
              </tr>
            </table>
          </div>
        ))}

      </div>
      </div>
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
