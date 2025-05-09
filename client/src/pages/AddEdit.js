import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    TrainName: "",
    SourceStation: "",
    DestinationStation: "",
    ArrivalTime: "",
    DepartureTime: "",
    seat_available: "",
    Date: "", // Add Date field to the initial state
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date } = state;

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:5000/api/get/${id}`)
                .then((resp) => setState({ ...resp.data[0] }));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!TrainName || !SourceStation || !DestinationStation || !ArrivalTime || !DepartureTime || !seat_available || !Date) {
            toast.error("Please provide a value for each input field");
        } else {
            if (!id) {
                axios
                    .post("http://localhost:5000/api/post", {
                        TrainName,
                        SourceStation,
                        DestinationStation,
                        ArrivalTime,
                        DepartureTime,
                        seat_available,
                        Date, // Include Date in the POST request
                    })
                    .then(() => {
                        setState(initialState);
                    })
                    .catch((err) => toast.error(err.response.data));
                    toast.success("Train Detail Added Successfully");

            } else {
                axios
                    .put(`http://localhost:5000/api/update/${id}`, {
                        TrainName,
                        SourceStation,
                        DestinationStation,
                        ArrivalTime,
                        DepartureTime,
                        seat_available,
                        Date, // Include Date in the PUT request
                    })
                    .then(() => {
                        setState(initialState);
                        toast.success("Train Detail Updated Successfully");
                    })
                    .catch((err) => toast.error(err.response.data));
            }
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                <img src="trrrr.png"  alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/addContact">Add Train</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                </ul>
            </nav>
            <div style={{ marginTop: "100px" }}>
                <form
                    style={{
                        margin: "auto",
                        padding: "15px",
                        maxWidth: "400px",
                        alignContent: "center",
                    }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="TrainName">Train Name</label>
                    <input
                        type="text"
                        id="TrainName"
                        name="TrainName"
                        placeholder="Enter Train Name..."
                        value={TrainName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="SourceStation">Source Station</label>
                    <input
                        type="text"
                        id="SourceStation"
                        name="SourceStation"
                        placeholder="Enter Source Station..."
                        value={SourceStation}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="DestinationStation">Destination Station</label>
                    <input
                        type="text"
                        id="DestinationStation"
                        name="DestinationStation"
                        placeholder="Enter Destination Station..."
                        value={DestinationStation}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="ArrivalTime">Arrival Time</label>
                    <input
                        type="time"
                        id="ArrivalTime"
                        name="ArrivalTime"
                        value={ArrivalTime}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="DepartureTime">Departure Time</label>
                    <input
                        type="time"
                        id="DepartureTime"
                        name="DepartureTime"
                        value={DepartureTime}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="seat_available">Seat available</label>
                    <input
                        type="number"
                        id="seat_available"
                        name="seat_available"
                        value={seat_available}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="Date">Date</label>
                    <input
                        type="date"
                        id="Date"
                        name="Date"
                        value={Date}
                        onChange={handleInputChange}
                    />
                    <input type="submit" value={id ? "Update" : "Save"} />
                </form>
            </div>
        </div>
    );
};

export default AddEdit;
