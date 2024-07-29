import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchQuery } from '../api'



const SearchBar = () => {

    const [userQuery, setUserQuery] = useState("");
    const navigate = useNavigate();

    const submitQuery = (e) => {
        e.preventDefault();
        const res = searchQuery(userQuery);
        navigate('/search', {state: {results: res, query: userQuery}})
    }
    

    return (
        <form onSubmit={submitQuery} className="searchBar">
            <input 
                type="text"
                value={userQuery}
                name="query" 
                placeholder="Search for a card..."
                className='searchField'
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