import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const history = useHistory();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search-trains?source=${source}&destination=${destination}&date=${date}`);
            history.push(`/trains?source=${source}&destination=${destination}&date=${date}`);
        } catch (error) {
            console.error('Error searching trains:', error);
        }
    };

    return (
        <div>
            <h2>Search Trains</h2>
            <div>
                <label>Source Station:</label>
                <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
            </div>
            <div>
                <label>Destination Station:</label>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Search Trains</button>
        </div>
    );
};

export default SearchPage;
