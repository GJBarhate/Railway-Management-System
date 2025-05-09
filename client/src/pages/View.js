import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import "./View.css";

const View = () => {
    const [train, setTrain] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setTrain({ ...resp.data[0] }));
    }, [id]);

    return (
        <div>
            <nav className="navbar">
                <div className="logo1">
                <img src="trrrr.png" alt="Logo" />
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
            <div className="view-container">
                <div className="card">
                    <div className="card-header">
                        <p>View Train Detail</p>
                    </div>
                    <div className="container">
                        <strong>TrainId :- </strong>
                        <span>{id}</span>
                        <br />
                        <br />
                        <strong>TrainName :- </strong>
                        <span>{train.TrainName}</span>
                        <br />
                        <br />
                        <strong>SourceStation :- </strong>
                        <span>{train.SourceStation}</span>
                        <br />
                        <br />
                        <strong>DestinationStation :- </strong>
                        <span>{train.DestinationStation}</span>
                        <br />
                        <br />
                        <strong>ArrivalTime :- </strong>
                        <span>{train.ArrivalTime}</span>
                        <br />
                        <br />
                        <strong>DepartureTime :- </strong>
                        <span>{train.DepartureTime}</span>
                        <br />
                        <br />
                        <strong>Seat Available :- </strong>
                        <span>{train.seat_available}</span>
                        <br />
                        <br />
                        <strong>Date :- </strong> {/* Include Date field */}
                        <span>{train.Date}</span> {/* Render Date value */}
                        <br />
                        <br />
                        <Link to="/">
                            <div className="btn btn-edit">Go Back</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;
