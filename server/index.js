import { config } from 'dotenv'
import cors from 'cors'
import express from 'express'
import AuthRoutes from './routes/AuthRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import ContactsRoutes from './routes/ContactsRoutes.js'
import UpdateRoutes from './routes/UpdateRoutes.js'
import { Server } from 'socket.io';
import { Router } from 'express';
config()

const app = express();
app.use(cors());
app.use(express.json())


app.use('/api/auth', AuthRoutes)
app.use('/api/messages', MessageRoutes)
app.use('/api/contacts', ContactsRoutes)
app.use('/api/update', UpdateRoutes)

const server = app.listen(process.env.PORT || 4500, () => {
    console.log('listening on ', process.env.PORT || 4500)
})

const io = new Server(server, {
    cors: { origin: "*" }
})
global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
        socket.broadcast.emit("online-users", {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })
    socket.on("signout", (userId) => {
        onlineUsers.delete(userId);
        socket.broadcast.emit("online-users", {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("receive-msg", {
                from: data.from,
                message: data.message
            })
        }
    });
    socket.on("outgoing-voice-call", (data) => {
        const { to, from, callType, roomId } = data;
        const sendUserSocket = onlineUsers.get(to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("incoming-voice-call", {
                from, roomId, callType
            })
        }
    })
    socket.on("outgoing-video-call", (data) => {
        const { to, from, callType, roomId } = data;
        const sendUserSocket = onlineUsers.get(to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("incoming-video-call", {
                from, roomId, callType
            })
        }
    });

    socket.on("reject-voice-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.from);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("voice-call-rejected")
        }
    })
    socket.on("reject-video-call", (data) => {
        const sendUserSocket = onlineUsers.get(data.from);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("video-call-rejected")
        }
    })

    socket.on("accept-incoming-call", ({ id }) => {
        const sendUserSocket = onlineUsers.get(id);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("accept-call")
        }
    })
    socket.on("end-call", ({ id }) => {
        const sendUserSocket = onlineUsers.get(id);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("call-ended")
        }
    })
})

export default app;