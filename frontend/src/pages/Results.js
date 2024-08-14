import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchQuery } from '../api.js';
import CardButton from '../components/card';
import left_ico from '../assets/left-arrow.svg';
import right_ico from '../assets/right-arrow.svg';

const Results = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(location.state?.results || []);
  const [query, setQuery] = useState(location.state?.query || searchParams.get('query'));
  const [loading, setLoading] = useState(!location.state?.results);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 50;

  

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchQuery(query);
        setResults(res.data);
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!location.state?.results || location.state.query !== query) {
      fetchResults();
    }
  }, [query, location.state]);

  const lastResultIndex = currentPage * resultsPerPage;
  const firstResultIndex = lastResultIndex - resultsPerPage;
  const currentResults = results.slice(firstResultIndex, lastResultIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  let pages = Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ));

  const n = pages.length;
  if (n > 10) {
    pages = (
      <>
        {pages[0]} {pages[1]}
        <br/>
        {pages[Math.floor(n / 2)]}
        <br/>
        {pages[n-2]} {pages[n-1]}
      </>
    );
  }

  if (n > 1) {
      pages = 
      <>
        <img src={left_ico} button key={totalPages + 1} onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        <br/>
        {pages}
        <br/>
        <img src={right_ico} key={totalPages + 2} onClick={() => paginate(currentPage + 1)} disabled={currentPage === n} />
      </>
  }

  pages = (
    <div className="pageNumbers">
      {pages}
    </div>
  );

  return (
    <div id="results-wrapper">
      <SearchBar />
      <h2>{loading ? "Loading..." : `Showing page ${currentPage} of ${results.length} results for "${query}"`}</h2>
      {error && <p className="error">{error}</p>}
      {pages}
      <ul>
        {currentResults.map((result, index) => (
          <CardButton key={index} scryfall_id={result.scryfall_id} name={result.name}></CardButton>
        ))}
      </ul>
      {pages}
    </div>
  );
};

export default Results;
