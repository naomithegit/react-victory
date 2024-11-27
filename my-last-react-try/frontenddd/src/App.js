import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    axios.get('http://localhost:8080/cities') // Adjust the URL to match your backend endpoint
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cities!', error);
      });
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/cities', { name: newCity }) // Adjust the URL to match your backend endpoint
      .then(response => {
        setNewCity('');
        fetchCities(); // Refresh the list of cities
      })
      .catch(error => {
        console.error('There was an error adding the city!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>City List</h1>
        <ul>
          {cities.map(city => (
            <li key={city.id}>{city.name}</li>
          ))}
        </ul>
        <form onSubmit={handleAddCity}>
          <input
            type="text"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            placeholder="Add a new city"
          />
          <button type="submit">Add City</button>
        </form>
      </header>
    </div>
  );
}

export default App;