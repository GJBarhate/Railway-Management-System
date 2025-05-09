import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    UserName: "",
    Email: "",
    Password: "",
};

const Login = () => {
    const [state, setState] = useState(initialState);

    const { UserName, Email, Password} = state;

    const {UserId} = useParams();

    const history = useHistory();

    useEffect(() => {
        if (UserId) {
            axios
                .get(`http://localhost:5000/api/get/${UserId}`)
                .then((resp) => setState({ ...resp.data[0] }));
        }
    }, [UserId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!UserName || !Email || !Password ) {
            toast.error("Please provide a value for each input field");
        } else {
            if (!UserId) {
                axios
                    .post("http://localhost:5000/api/post1", {
                        UserName,
                        Email,
                        Password,
                    })
                    .then(() => {
                        setState(initialState);
                        
                    })
                    .catch((err) => toast.error(err.response.data));
                    toast.success("Login Successfully");
            } else {
                axios
                    .put(`http://localhost:5000/api/Login/${UserId}`, {
                        UserName,
                        Email,
                        Password,

                    })
                    .then(() => {
                        setState(initialState);
                        toast.success("Login Successfully");
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
            {/* const style={width:20}; */}
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
                    <label htmlFor="UserName">Admin Name</label>
                    <input
                        type="text"
                        id="UserName"
                        name="UserName"
                        placeholder="Enter your Name..."
                        value={UserName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        id="Email"
                        name="Email"
                        placeholder="Enter your Email..."
                        value={Email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="Password">Password</label>
                    <input
                        type="text"
                        id="Password"
                        name="Password"
                        placeholder="Enter Password..."
                        value={Password}
                        onChange={handleInputChange}
                    />
                    <input type="submit" value={ "Login"} />
                </form>
            </div>
        </div>
    );
};

export default Login;

