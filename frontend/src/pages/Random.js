import { useEffect } from 'react';
import { randomCard } from '../api.js';
import { useNavigate } from 'react-router-dom';

const Random = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await randomCard();
        const id = response.data[0].scryfall_id;
        const path = `/scry/${id}`
        navigate(path)
      } catch (error) {
        console.error(error)
      }
    }
    fetch();
  }, [navigate])

  return null

};

export default Random;
