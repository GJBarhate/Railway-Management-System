import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const TicketDetailsPage = () => {
    const { ticketId } = useParams();
    const [ticketDetails, setTicketDetails] = useState(null);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                // Fetch ticket details from the backend server
                const response = await axios.get(`http://localhost:5000/api/get-ticket/${ticketId}`);
                // Set the ticket details to state
                setTicketDetails(response.data);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };
        // Call the fetchTicketDetails function when the ticketId changes
        fetchTicketDetails();
    }, [ticketId]); // Ensure useEffect runs whenever ticketId changes

    return (
        <div>
            <h2>Ticket Details</h2>
            {/* Conditional rendering to display ticket details if available */}
            {ticketDetails ? (
                <div>
                    <p>Train ID: {ticketDetails.TrainId}</p>
                    <p>Name: {ticketDetails.Name}</p>
                    <p>Age: {ticketDetails.Age}</p>
                    <p>Gender: {ticketDetails.Gender}</p>
                    <p>Mobile Number: {ticketDetails.MobileNumber}</p>
                    {/* Add other ticket details here */}
                </div>
            ) : (
                // Display a loading message while fetching ticket details
                <p>Loading ticket details...</p>
            )}
        </div>
    );
};

export default TicketDetailsPage;
