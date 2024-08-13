import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar.js';
import CardButton from '../components/card.js';
import { fetchCards } from '../api.js';

const Search = () => {
  
    return (
      <div className="homePage">
        <SearchBar></SearchBar>
      </div>
    );
  };

export default Search