import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { app } from './app.js';
import { connectDB } from './db/index.js';
import {router} from './routes/user.routes.js'; // Adjust the path if needed

// Connect to database
connectDB()
    .then(() => {
        const server = http.createServer(app);

        // Setup Socket.io
        const io = new Server(server, {
            cors: {
                origin: "*", // Allow all origins for testing (change in production)
                methods: ["GET", "POST"]
            }
        });

        // Middleware to handle authentication (Optional)
        io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("Authentication error"));
            }
            next();
        });

        // Handle Socket.io connections
        io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            socket.on("sendMessage", (data) => {
                console.log("Message received:", data);
                io.emit("receiveMessage", data); // Broadcast to all users
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });

        // Express middlewares
        app.use(cors());
        app.use(express.json());

        // Define API routes
        app.use('/api/v1/users', router);

        const PORT = process.env.PORT || 8000;
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });
