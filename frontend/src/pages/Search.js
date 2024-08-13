import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar.js';
import CardButton from '../components/card.js';
import { fetchCards } from '../api.js';

const Search = () => {
    const [randCards, setRandCards] = useState([]);
  
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
    );
  };

export default Search