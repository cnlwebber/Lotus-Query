import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/searchBar';
import { useLocation, useSearchParams } from 'react-router-dom';
import { searchQuery } from '../api.js';
import CardButton from '../components/card';
import ReactPaginate from 'react-paginate';
import left_ico from '../assets/left-arrow.svg';
import right_ico from '../assets/right-arrow.svg';


const Results = () => {


  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!location.state?.results);
  const [error, setError] = useState(null);
  
  // Pagination https://www.npmjs.com/package/react-paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 50;

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = location.state?.query || searchParams.get('query');
        if (query) {
          const res = await searchQuery(query);
          setResults(res.data);
          setPageCount(Math.ceil(res.data.length / resultsPerPage));
          const endOffset = itemOffset + resultsPerPage;
          setCurrentItems(res.data.slice(itemOffset, endOffset));
        }
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [itemOffset, resultsPerPage, location.state?.query, searchParams]);

  const handlePageClick = useCallback((event) => {
    const newOffset = (event.selected * resultsPerPage) % results.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  }, [resultsPerPage, results.length]);

  return (
    <div id="results-wrapper">
      <SearchBar />
      <h2>{loading ? "Loading..." : `Showing page ${currentPage + 1} of ${pageCount} pages`}</h2>
      {error && <p className="error">{error}</p>}

      <ReactPaginate
        breakLabel={"..."}
        breakClassName={'pagination-break'}
        nextLabel={<img src={right_ico} alt='next'/>}
        disabledClassName={'pagination-disabled'}
        onPageChange={handlePageClick}
        nextClassName={'pagination-next'}
        previousClassName={'pagination-prev'}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageClassName={'pagination-page'}
        previousLabel={<img src={left_ico} alt='prev'/>}
        renderOnZeroPageCount={null}
        containerClassName={"pagination-container"}
        activeClassName={"pagination-active"}
        forcePage={currentPage}
      />

      <ul>
        {currentItems.map((result, index) => (
          <CardButton key={index} scryfall_id={result.scryfall_id} name={result.name} />
        ))}
      </ul>

      <ReactPaginate
        breakLabel={"..."}
        breakClassName={'pagination-break'}
        nextLabel={<img src={right_ico} alt='next'/>}
        disabledClassName={'pagination-disabled'}
        onPageChange={handlePageClick}
        nextClassName={'pagination-next'}
        previousClassName={'pagination-prev'}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        pageClassName={'pagination-page'}
        previousLabel={<img src={left_ico} alt='prev'/>}
        renderOnZeroPageCount={null}
        containerClassName={"pagination-container"}
        activeClassName={"pagination-active"}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Results;
