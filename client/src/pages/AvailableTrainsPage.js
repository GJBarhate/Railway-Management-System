import React, { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const AvailableTrainsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');
    const destination = queryParams.get('destination');
    const date = queryParams.get('date');
    const [availableTrains, setAvailableTrains] = useState([]);
    const [isRouteAvailable, setIsRouteAvailable] = useState(false);

    useEffect(() => {
        const fetchAvailableTrains = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/search-trains?source=${source}&destination=${destination}&date=${date}`);
                setAvailableTrains(response.data);
                setIsRouteAvailable(response.data.length > 0);
            } catch (error) {
                console.error('Error fetching available trains:', error);
            }
        };
        fetchAvailableTrains();
    }, [source, destination, date]);

    return (
        <div>
            <h2>Available Trains</h2>
            {isRouteAvailable ? (
                <ul>
                    {availableTrains.map(train => (
                        <li key={train.id}>
                            {train.TrainName} - {train.SourceStation} to {train.DestinationStation} - {train.ArrivalTime} to {train.DepartureTime}
                            <Link to={`/book/${train.id}`}>
                                <button>Continue Booking</button>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trains available for the selected route and date.</p>
            )}
        </div>
    );
};

export default AvailableTrainsPage;
