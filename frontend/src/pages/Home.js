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
        <div className="innerWrapper">
        </div>
        <CardSlideshow />
        <div className="innerWrapper">
            <h1> Welcome </h1>
            <p> Hello and welcome to Lotus Query! Lotus Query is a student project implementing a Magic the Gathering card database and custom frontend for querying cards! This project was originally started in July of 2024 for a Database Systems &amp; Design course at <a href="https://www.tacoma.uw.edu/">University of Washington Tacoma</a>. </p>

            <h2> Software </h2>
            <p> Our project utilizes <a href="https://www.mysql.com/">MySQL</a>, <a href="https://nodejs.org/en">Node.js</a>, and <a href="https://expressjs.com/">ExpressJS</a> using  the MVC design pattern as a backend framework for storing card data. All data was collected from another project via <a href="https://mtgjson.com/">MTGJson</a>; however, the table&apos;s schema was originally created by our members. The frontend of our application is developed using <a href="https://react.dev/">React</a> for general layout and uses <a href="https://www.npmjs.com/package/react-axios">Axios</a> to interface with the backend. </p>

            <h2> Members </h2>
            <p> The founding members of Lotus Query, and the student project accompanying it, are <a href="https://github.com/JSBrenio">Jeremiah Brenio</a>, <a href="https://github.com/westerntoad">Abraham Engebretson</a>, and <a href="https://github.com/cnlwebber">Conner Webber</a>. </p>

            <h2> Contributing </h2>
            <p> If you&apos;re interested in contributing to this project, or simply perusing the source code, feel free to clone <a href="">our project on GitHub</a>!</p>
            
        </div>
        </div>
    );
};

export default Home;
