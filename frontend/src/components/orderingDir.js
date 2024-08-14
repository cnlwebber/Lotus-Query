import React from 'react';

const OrderingDir = ({ direction, directionChange }) => {
    return (
        <select value={direction} onChange={directionChange}>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
        </select>
    );
}

export default OrderingDir;