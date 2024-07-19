import React from 'react';
import SearchBar from '../components/searchBar';
import { useLocation } from 'react-router-dom';
import './Results.css'

const Search = () => {

  const location = useLocation();
  const { results, query } = location.state;

  return (
    <div>
      <h1>Results Page</h1>
      <p>This is where the query results will be displayed</p>
    </div>
  );
};

export default Search;