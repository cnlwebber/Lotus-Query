import React from 'react';

const OrderingMenu = ({ ordering, orderingChange }) => {
    return (
        <div class="ordering-select">
            <select value={ordering} onChange={orderingChange}>
                <option value="Name">Name</option>
                <option value="Mana Cost">Mana Cost</option>
                <option value="Release Date">Release Date</option>
            </select>
        </div>

    );
}

export default OrderingMenu;