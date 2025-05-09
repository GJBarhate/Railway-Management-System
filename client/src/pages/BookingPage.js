import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    

    const handleBooking = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/book-ticket`, {
                TrainId: id,
                Name: name,
                Age: age,
                Gender: gender,
                MobileNumber: mobileNumber
            });
            history.push(`/ticket/${response.data.ticketId}`);
            // Display success toast notification
            toast.success('Ticket booked successfully!');
        } catch (error) {
            console.error('Error booking ticket:', error);
        }
    };
    

    return (
        <div>
            <h2>Enter Personal Details</h2>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
                <label>Gender:</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                {/* If you want to use a select input for gender, uncomment the following code */}
                {/* <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select> */}
            </div>
            <div>
                <label>Mobile Number:</label>
                <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>
            <button onClick={handleBooking}>Book Ticket</button>
        </div>
    );
};

export default BookingPage;
