import React from 'react';
import { Link } from 'react-router-dom';


const CardButton = ({ scryfall_id, name }) => {
    const fileFace = 'front';
    const fileType= 'large';
    const fileFormat = 'jpg';
    const dir1 = scryfall_id.charAt(0);
    const dir2 = scryfall_id.charAt(1);
    const image = `https://cards.scryfall.io/${fileType}/${fileFace}/${dir1}/${dir2}/${scryfall_id}.${fileFormat}`;
    console.log(image)
    return (
        <Link to={`/card/${scryfall_id}`} className="cardButton">
            <img src={image} alt={name} classname={`cardImage`}></img>
        </Link>
    );
};

export default CardButton;