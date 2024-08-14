import React, { useState, useEffect } from 'react';
import SearchBar from '../components/searchBar';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchQuery } from '../api.js';
import CardButton from '../components/card';


const Results = () => {


  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(location.state?.results || []);
  const [query, setQuery] = useState(location.state?.query || searchParams.get('query'));
  const [loading, setLoading] = useState(!location.state?.results);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 30;
  const lastResultIndex = currentPage * resultsPerPage;
  const firstResultIndex = lastResultIndex - resultsPerPage;
  const currentResults = results.slice(firstResultIndex, lastResultIndex);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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





  return (
    <div>
      <SearchBar />
      <h2>{loading ? "Loading..." : `${results.length} results for "${query}"`}</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {currentResults.map((result, index) => (
          <CardButton key={index} scryfall_id={result.scryfall_id} name={result.name}></CardButton>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Results;
