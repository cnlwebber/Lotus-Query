import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { searchQuery } from '../api';

const SearchBar = () => {
    const [userQuery, setUserQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitQuery = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await searchQuery(userQuery);
            console.log("DEBUGGGING: ", res);
            navigate({ pathname: '/results',
                search: createSearchParams({
                    query: userQuery
                }).toString()},
                { state: { results: res.data, query: userQuery } });
        } catch (err) {
            setError("Failed to fetch search results. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searchWrapper">
        <a href="/search/help"> how do I search? </a>
        <form onSubmit={submitQuery} className="search">
            <input 
                type="text"
                value={userQuery}
                name="query" 
                placeholder="Search for a card..."
                className="searchField"
                onChange={(event) => setUserQuery(event.target.value)}
                disabled={loading}
            />
            <button 
                type="submit" 
                className="searchButton"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
        </div>
    );
};

export default SearchBar;
