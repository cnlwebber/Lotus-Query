import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nRandomCards } from '../api.js';

export const RandCardButton = () => {
    const [randCards, setRandCards] = useState([]);

    useEffect(() => {
        const getCards = async () => {
            const response = await nRandomCards(5);
            setRandCards(response.data);
        };
        getCards();
    }, []);

    return (
      <div>
      {randCards.map(card => (
        <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
      ))}
      </div>
  );
}

const CardButton = ({ scryfall_id, name }) => {

  // https://mtgjson.com/faq/#how-do-i-access-a-card-s-imagery
    const fileFace = 'front';
    const fileType= 'normal';
    const fileFormat = 'jpg';
    const dir1 = scryfall_id.charAt(0);
    const dir2 = scryfall_id.charAt(1);
    const image = `https://cards.scryfall.io/${fileType}/${fileFace}/${dir1}/${dir2}/${scryfall_id}.${fileFormat}`;
    const queryParams = `/${scryfall_id}`;
    const linkTo = `/scry${queryParams}`;
    return (
        <Link to={linkTo} className="cardButton">
            <img src={image} alt={name} className={`cardImage`}></img>
        </Link>
    );
};

export default CardButton;



/*const [randCards, setRandCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      const response = await fetchCards();
      console.log(response.data)
      setRandCards(response.data);
    };
    getCards();
  }, []);

  return (
    <div className="homePage">
      <SearchBar></SearchBar>
      <div className="randomCards">
        {randCards.map(card => (
          <CardButton key={card.uuid} scryfall_id={card.scryfall_id} name={card.name} />
        ))}
      </div>
    </div>
  );*/
