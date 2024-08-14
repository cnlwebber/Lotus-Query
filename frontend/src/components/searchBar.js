import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import OrderingMenu from './ordering';
import OrderingDir from './orderingDir';

const SearchBar = ({ prevOrder, prevDir, prevQuery }) => {
    const [userQuery, setUserQuery] = useState(prevQuery || "");
    const [ordering, setOrdering] = useState(prevOrder || "Name");
    const [direction, setDirection] = useState(prevDir || "ASC");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitQuery = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            navigate({ pathname: '/results',
                search: createSearchParams({
                    query: userQuery,
                    order: ordering,
                    dir: direction
                }).toString()});
        } catch (err) {
            setError("Failed to fetch search results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOrderingChange = (event) => {
        setOrdering(event.target.value);
    }

    const handleOrderingDirChange = (event) => {
        setDirection(event.target.value);
    }

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
            <OrderingMenu
                ordering={ordering}
                orderingChange={handleOrderingChange}
            />
            <OrderingDir
                direction={direction}
                directionChange={handleOrderingDirChange}
            />
            {error && <p className="error">{error}</p>}
        </form>
        </div>
    );
};

export default SearchBar;
