// import React, { useState, useEffect } from 'react';
// import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Home.css";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Home = () => {
//     const [data, setData] = useState([]);

//     const loadData = async () => {
//         const response = await axios.get("http://localhost:5000/api/get");
//         setData(response.data);
//     };
//     const history = useHistory();


//     useEffect(() => {
//         loadData();
//     }, []);

//     const deleteContact = (id) => { 
//         if (window.confirm("Are you sure you want to delete this TrainDetail?")) {
//             axios.delete(`http://localhost:5000/api/remove/${id}`)
//                 .then(() => {
//                     loadData(); 

//                 })
//                 .catch((error) => console.log(error));
 

//         }toast.success("TrainDetail Deleted Successfully");
//         setTimeout(() => history.push("/"), 500);

//     };

//     return (
        
//         <div style={{ marginTop: "0px" }}>
//             <div>
//             <nav className="navbar">
//                 <div className="logo">
//                 <img src="trrrr.png" alt="Logo" />
//                 </div>
//                 <ul className="nav-links">
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/addContact">Add Train</Link>
//                     </li>
//                     <li>
//                         <Link to="/Login">Login</Link>
//                     </li>
//                 </ul>
//             </nav>
//             <div style={{ marginTop: "0px" }}>
//                 <table className="styled-table">
//                     {/* Table header and body */}
//                 </table>
//             </div>
//         </div>

            
//             <Link to="/addContact">
//                 <button className="btn btn-contact">Add Train Detailed</button>
//             </Link>
//             <Link to="/booking">
//                     <button className="btn btn-contact">Book Ticket</button>
//                 </Link>
//             <table className="styled-table">
//                 <thead>
//                     <tr>
//                         <th style={{ textAlign: "center" }}>TrainId</th>
//                         <th style={{ textAlign: "center" }}>TrainName</th>
//                         <th style={{ textAlign: "center" }}>SourceStation</th>
//                         <th style={{ textAlign: "center" }}>DestinationStation</th>
//                         <th style={{ textAlign: "center" }}>ArrivalTime</th>
//                         <th style={{ textAlign: "center" }}>DepartureTime</th>
//                         <th style={{ textAlign: "center" }}>seat_available</th>
//                         <th style={{ textAlign: "center" }}>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => {
//                         return (
//                             <tr key={item.id}> 
//                                 <th scope="row">{index + 1}</th>
//                                 <td>{item.TrainName}</td>
//                                 <td>{item.SourceStation}</td>
//                                 <td>{item.DestinationStation}</td>
//                                 <td>{item.ArrivalTime}</td>
//                                 <td>{item.DepartureTime}</td>
//                                 <td>{item.seat_available}</td>
//                                 <td>
//                                     <Link to={`/update/${item.id}`}> 
//                                         <button className="btn btn-edit">Edit</button>
//                                     </Link>

//                                     <Link to="/">
//                                     <button className="btn btn-delete" 
//                                     onClick={() => deleteContact(item.id)}
//                                     >
//                                         Remove
//                                     </button>
//                                     </Link>
                                    


//                                     <Link to={`/view/${item.id}`}>
//                                         <button className="btn btn-view">View</button>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/get");
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error loading data:", error);
            toast.error("Failed to load train data");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = async (id) => { 
        if (window.confirm("Are you sure you want to delete this train?")) {
            try {
                await axios.delete(`http://localhost:5000/api/remove/${id}`);
                toast.success("Train deleted successfully");
                loadData();
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete train");
            }
        }
    };

    if (loading) return <div>Loading trains...</div>;

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="logo">
                    <img src="trrrr.png" alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/addContact">Add Train</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                </ul>
            </nav>

            <div className="action-buttons">
                <Link to="/addContact" className="btn btn-add">Add Train</Link>
                <Link to="/search" className="btn btn-book">Book Ticket</Link>
            </div>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Train Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Arrival</th>
                        <th>Departure</th>
                        <th>Seats</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.TrainName}</td>
                            <td>{item.SourceStation}</td>
                            <td>{item.DestinationStation}</td>
                            <td>{item.ArrivalTime}</td>
                            <td>{item.DepartureTime}</td>
                            <td>{item.seat_available}</td>
                            <td>{item.Date}</td>
                            <td className="actions">
                                <Link to={`/update/${item.id}`} className="btn btn-edit">Edit</Link>
                                <button onClick={() => deleteContact(item.id)} className="btn btn-delete">Delete</button>
                                <Link to={`/view/${item.id}`} className="btn btn-view">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;