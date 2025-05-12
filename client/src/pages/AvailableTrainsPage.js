import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AvailableTrainsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');
    const destination = queryParams.get('destination');
    const date = queryParams.get('date');
    const [availableTrains, setAvailableTrains] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAvailableTrains = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/search-trains?source=${source}&destination=${destination}&date=${date}`
                );
                // Ensure response.data is always an array
                setAvailableTrains(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching trains:', error);
                toast.error("Failed to fetch trains");
                setAvailableTrains([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAvailableTrains();
    }, [source, destination, date]);

    if (loading) return <div>Loading trains...</div>;

    return (
        <div className="container">
            <h2>Available Trains ({source} to {destination})</h2>
            {availableTrains.length > 0 ? (
                <ul className="train-list">
                    {availableTrains.map(train => (
                        <li key={train.id} className="train-item">
                            <div>
                                <h3>{train.TrainName}</h3>
                                <p>{train.SourceStation} → {train.DestinationStation}</p>
                                <p>Departure: {train.DepartureTime} | Arrival: {train.ArrivalTime}</p>
                                <p>Seats available: {train.seat_available}</p>
                            </div>
                            <Link to={`/book/${train.id}`} className="book-btn">
                                Book Now
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-trains">No trains available for the selected route and date.</p>
            )}
        </div>
    );
};

export default AvailableTrainsPage;