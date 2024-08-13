import React, { useState, useEffect } from 'react';
import RandomCard from '../components/RandomCard.js';
import { randomCard } from '../api.js';

const Random = () => {

  return (
    <div className="randomCards">
      <RandomCard />
    </div>
  );
};

export default Random;
