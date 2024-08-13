import React, { useState, useEffect } from 'react';
import RandomCard from '../components/RandomCard.js';
import CardSlideshow from '../components/CardSlideshow.js';

const Home = () => {
    const cards = [];
    for (var i = 0; i < 10; i++) {
        cards.push(<RandomCard />);
    }

    return (
        <div className="homePage">
            <CardSlideshow />
        </div>
    );
};

export default Home;
