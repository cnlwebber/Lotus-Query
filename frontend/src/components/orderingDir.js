import React from 'react';

const OrderingDir = ({ direction, directionChange }) => {
    return (
        <div class="direction-select">
            <select value={direction} onChange={directionChange} className='direction-menu'>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </select>
        </div>

    );
}

export default OrderingDir;