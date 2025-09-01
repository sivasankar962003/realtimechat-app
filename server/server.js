import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import {connectDB} from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import {Server} from "socket.io"
import messageRouter from "./routes/messageRoutes.js";


dotenv.config();
// create  server
const app=express();
const server=http.createServer(app)


export const io=new Server(server,{
    cors:{origin:"*"}
})

export const userSocketMap={};

io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId;
    console.log("User Connected",userId);
    if(userId)userSocketMap[userId]=socket.id;


    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))


    })



})

const port=process.env.PORT || 5000;
app.use(express.json({limit:"4mb"}));
app.use(cors({origin:"*",credentials:true}));
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)
await connectDB();




if(process.env.NODE_ENV!=="production"){
server.listen(port,()=>{console.log("server listen on port is",port)})}
export default  server;