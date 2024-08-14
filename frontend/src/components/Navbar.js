import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo256.png';
// icon source:
// https://github.com/apancik/public-domain-icons/blob/df284bf4bbd52becf5d3cf73791660e3f538a1e3/dist/building%20home%20house%20dashboard%20index.svg
import home_ico from '../assets/home.svg';
// icon source:
// https://github.com/apancik/public-domain-icons/blob/df284bf4bbd52becf5d3cf73791660e3f538a1e3/dist/object%20search%20search%20find%20magnify%20magnifying%20.svg
import search_ico from '../assets/search.svg';
// https://icon-sets.iconify.design/material-symbols/shuffle/
import shuffle_ico from '../assets/shuffle.svg';

const LinkTo = ({dir, label, ico}) => {
    return (
    <div>
        <Link to={dir}>
            <img className="nav-bar-ico" src={ico} alt="Icon"/>
            {label}
        </Link>
    </div>
    );
};

const Navbar = () => {
    return (
        <div id="nav-bar">
            <div id="nav-bar-logo">
                <div> <img src={logo} alt="Logo" /> </div>
                <h2 className="website-name"> Lotus Query </h2>
            </div>
            <nav>
                < LinkTo dir={"/"} label={"Home"} ico={home_ico}/>
                < LinkTo dir={"/search"} label={"Search"} ico={search_ico}/>
                < LinkTo dir={"/random"} label={"Random"} ico={shuffle_ico}/>
            </nav>
        </div>
    );
};

export default Navbar;
