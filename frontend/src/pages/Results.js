import React from 'react';
import SearchBar from '../components/searchBar';
import { useLocation } from 'react-router-dom';

const Results = () => {

  const location = useLocation();
  const { results, query } = location.state;
  
  return (
    <div>
      <SearchBar></SearchBar>
      <h2>{results.length} results</h2>
    </div>
  );
};

export default Results;