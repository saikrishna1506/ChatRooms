
//COMBINED SERVERS

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://chatrooms-saikrishna01.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(
  "mongodb+srv://saikrishnachintha06:sai123krishna@cluster0.i1yyaz8.mongodb.net/localchat?retryWrites=true&w=majority"
);
console.log("mongodb connected");

// app.get("/",function(req,res){
//   res.sendFile(
//     path.join(__dirname,"../frontend/build/index")
//   )
// })
app.get("/",(req,res)=>{
  res.json("Hello");
})

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

app.get("/dashboard", varifyUser, (req, res) => {
  res.json("Success");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({ Status: "Success", role: user.role });
          } else {
            return res.json("The password is incorrect");
          }
        });
      } else {
        return res.json("No record exists...");
      }
    });
});

// Create an HTTP server that combines both your Express app and Socket.IO server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {
  console.log("socket id is =" + socket.id + "connected");
  // join the socket in its own room
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  // listen for messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });
  // user disconnect
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});
                                         



// const port = 3001;   
const PORT=3001;
server.listen(PORT, () => {
  console.log("Combined Server is Running "+PORT);
});

