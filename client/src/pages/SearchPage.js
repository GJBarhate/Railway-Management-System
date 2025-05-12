import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SearchPage = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!formData.source || !formData.destination || !formData.date) {
            toast.warning("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            await axios.get(
                `http://localhost:5000/api/search-trains?source=${formData.source}&destination=${formData.destination}&date=${formData.date}`
            );
            history.push(`/trains?source=${formData.source}&destination=${formData.destination}&date=${formData.date}`);
        } catch (error) {
            console.error('Search error:', error);
            toast.error("Failed to search trains");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h2>Search Trains</h2>
            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label>Source Station:</label>
                    <input 
                        type="text" 
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Destination Station:</label>
                    <input 
                        type="text" 
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search Trains'}
                </button>
            </form>
        </div>
    );
};

export default SearchPage;