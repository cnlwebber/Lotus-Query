import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchQuery } from '../api';

const SearchBar = () => {
    // useState hook saves state of search query
    const [userQuery, setUserQuery] = useState("");
    // for navigating to /search endpoint
    const navigate = useNavigate();

    // when query submitted, call searchQuery from api, navigate to /search with given state
    const submitQuery = (e) => {
        e.preventDefault();
        const res = searchQuery(userQuery);
        navigate('/search', { state: { results: res, query: userQuery } });
    };

    // actual html component
    return (
        <form onSubmit={submitQuery} className="search">
            <input 
                type="text"
                value={userQuery}
                name="query" 
                placeholder="Search for a card..."
                className="searchField"
                onChange={(e) => setUserQuery(e.target.value)}
            />
            <button 
                type="submit" 
                className="searchButton">Search
            </button>
        </form>
    );
};

export default SearchBar;
