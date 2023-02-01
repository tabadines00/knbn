const express = require("express");
const app = express();

const hostname = 'localhost';
const port = 4000;

// Use express.json and urlencoded extended
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up CORS
const http = require('http').Server(app)
const cors = require("cors")

app.use(cors())

// set up socketIO
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log(`\$: ${socket.id} user just connected!`)
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log(`\$: ${socket.id} just disconnected.`)
    })
})

// GET requests
app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

