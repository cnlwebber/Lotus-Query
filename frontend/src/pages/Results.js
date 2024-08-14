import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/searchBar';
import { useSearchParams } from 'react-router-dom';
import { searchQuery } from '../api.js';
import CardButton from '../components/card';
import ReactPaginate from 'react-paginate';
import left_ico from '../assets/left-arrow.svg';
import right_ico from '../assets/right-arrow.svg';


const Results = () => {


  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination https://www.npmjs.com/package/react-paginate
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const ordering = searchParams.get('order') || 'Name';
  const direction = searchParams.get('dir') || 'ASC';
  const resultsPerPage = 50;

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = searchParams.get('query');
        if (query && ordering && direction) {
          const res = await searchQuery(query, ordering, direction);
          setResults(res.data);
          setPageCount(Math.ceil(res.data.length / resultsPerPage));
          const endOffset = itemOffset + resultsPerPage;
          setCurrentItems(res.data.slice(itemOffset, endOffset));
        }
      } catch (error) {
        setError("Failed to fetch search results. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [itemOffset, resultsPerPage, searchParams]);

  const handlePageClick = useCallback((event) => {
    const newOffset = (event.selected * resultsPerPage) % results.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  }, [resultsPerPage, results.length]);

  return (
    <div id="results-wrapper">
      <SearchBar 
        prevOrder={ordering}
        prevDir={direction}
      />
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
      <h2>{loading ? "Loading..." : `Showing page ${currentPage + 1} of ${pageCount} pages`}</h2>
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
