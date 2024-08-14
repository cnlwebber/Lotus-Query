import React from 'react';

const OrderingMenu = ({ ordering, orderingChange }) => {
    return (
        <select value={ordering} onChange={orderingChange}>
            <option value="Name">Name</option>
            <option value="Mana Cost">Mana Cost</option>
            <option value="Release Date">Release Date</option>
        </select>
        
    );
}

export default OrderingMenu;