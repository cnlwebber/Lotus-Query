import React from 'react';
import { Link } from 'react-router-dom';
import './accountButton.css';

const AccountButton = ({size}) => {
    return (
        <Link to="/account" className={`accountButton ${size}`}>
            {/* maybe we store a set of profile pics the user can choose from, or let
            them upload an avatar?*/}
            <img src="../assets/account.png" alt="Logo" classname={`accountImage ${size}`}></img>
        </Link>
    );
};

export default AccountButton;