const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rmpsp1A@",
    database: "crud_contact",
});

db.connect(function (err) {
    if (err) {
        console.log("Connection error to mysql", err);
        return;
    }
    console.log("Connected to MySQL..")
});

const sqlQuery = `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rmpsp1A@';`

function authenticationConfig() {
    db.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("Authentication function error :");
            console.log(err);
            return;
        }
        console.log("Authentication configuration applied successfully..");
    });
}

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date } = req.body;
    const sqlInsert = "INSERT INTO contact_db (TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.post("/api/post1", (req, res) => {
    const { UserName, Email, Password } = req.body;
    const sqlInsert = "INSERT INTO Users (UserName, Email, Password) VALUES (?, ?, ?)";
    db.query(sqlInsert, [UserName, Email, Password], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date } = req.body;
    const sqlUpdate = "UPDATE contact_db SET TrainName = ?, SourceStation = ?, DestinationStation = ?, ArrivalTime = ?, DepartureTime = ?, seat_available = ?, Date = ? WHERE id = ?";
    db.query(sqlUpdate, [TrainName, SourceStation, DestinationStation, ArrivalTime, DepartureTime, seat_available, Date, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

// train booking
// API for Searching Trains
app.get("/api/search-trains", (req, res) => {
    const { source, destination, date } = req.query;
    const sqlSearch = "SELECT * FROM contact_db WHERE SourceStation = ? AND DestinationStation = ? AND Date = ?";
    db.query(sqlSearch, [source, destination, date], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Error in fetching trains");
        }
        res.json(results);
    });
});

function updateSeats(TrainId, res) {
    const sqlUpdateSeats = "UPDATE contact_db SET seat_available = seat_available - 1 WHERE id = ?";
    db.query(sqlUpdateSeats, [TrainId], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Failed to update seats");
        }
        res.send("Booking successful and seat updated");
    });Ticket
}

app.get("/api/get-ticket/:bookingId", (req, res) => {
    const { bookingId } = req.params;
    const sqlGetTicket = "SELECT * FROM bookings WHERE id = ?";
    db.query(sqlGetTicket, [bookingId], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Failed to retrieve ticket");
        }
        res.json(result);
    });
});

app.post("/api/book-ticket", (req, res) => {
    const { TrainId,Name, Age, Gender, MobileNumber } = req.body;
    const sqlBookTicket = "INSERT INTO bookings (TrainId, Name, Age, Gender, MobileNumber) VALUES (?, ?,?, ?, ?)";
    db.query(sqlBookTicket, [TrainId, Name, Age, Gender, MobileNumber], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send("Booking failed");
        }
        res.send({ ticketId: result.insertId }); 
    });
});




const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


