import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [airportCode, setAirportCode] = useState('');

    const handleInputChange = (e) => {
        setAirportCode(e.target.value.toUpperCase()); // Uppercase
    };

    const handleSearch = () => {
        onSearch(airportCode);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter airport code"
                value={airportCode}
                onChange={handleInputChange}
                maxLength={3}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;