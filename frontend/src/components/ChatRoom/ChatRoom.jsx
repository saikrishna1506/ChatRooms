import React, { useState } from "react";
import useChat from "../../useChat";
import "./chat.css";
import { useParams } from "react-router-dom";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ChatRoom = (props) => {
  // const { roomId } = useParams();
  const { roomId, userName } = useParams();
  console.log(roomId);
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  // const [user, setUser] = useState("");
  //to display the users
  // const [username,setUsername]=useState("");

  // const handleJoinRoom=()=>{
  //   const user =prompt("enter your name");
  //   setUsername(user);
  //   // Send the username and room ID to the server
  //   socketRef.current.emit('joinRoom',{roomId,username:user});
  // }

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage, userName);

    // console.log(newMessage)
    setNewMessage("");
  };

  function getUniqueUserNames(messages) {
    const uniqueUserNames = new Set();
    uniqueUserNames.add(userName);
  
    messages.forEach((message) => {
      uniqueUserNames.add(message.senderName);
    });
    return Array.from(uniqueUserNames);
  }

  return (
    <div className="chat-room">
      
      <div className="user-list">
      <p className="user-list-title">Users in the Room:</p>
        <ol>
          {getUniqueUserNames(messages).map((userName, i) => (
            <li key={i} className="fade-in">{userName}</li>
            
          ))}
        </ol>
      </div>
      <div className="chat-room-container chat-interface">
        <div className="room-id">Room id : {roomId}</div>
        {/* <div className="room-id">userName : {userName}</div> */}

        <ReactScrollToBottom className="messages-container">
          <ol className="messages-list">
            {messages.map((message, i) => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {/* {console.log(message.ownedByCurrentUser)} */}
                {/* Display the username with the message */}
                {/* <span className="username">{message.senderId === socketRef.current.id ? 'You' : message.username}:</span> */}
                {/* displays name of the sender */}
                <p className="message-sender">
                  {message.ownedByCurrentUser ? "You" : message.senderName}:
                </p>
                <p className="message-body">{message.body}</p>
                {/* {message.senderName}
              {message.body} */}
                {/* {console.log(message.body)} */}
              </li>
            ))}

            {/* <li>heool</li> */}
          </ol>
        </ReactScrollToBottom>
        <div className="input-container">
        <input 
        type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Enter New Message..."
          className="input new-message-input-field "
        ></input>
        <button onClick={handleSendMessage} className="send-message-button button">
          send
        </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

// // //UPDATED WITH NEW CODE OF USERS LISTimport React, { useState, useEffect, useRef } from "react";
// import useChat from "../../useChat";
// import "./chat.css";
// import socketIOClient from 'socket.io-client';
// import { useLocation } from "react-router-dom";
// import { useState,useRef,useEffect } from "react";
// const SOCKET_SERVER_URL="http://localhost:4000"
// const ChatRoom = (props) => {
//   const { search } = useLocation();
//   const username = new URLSearchParams(search).get("username");

//   const { roomId } = props.match.params;
//   const { messages, sendMessage } = useChat(roomId);
//   const [newMessage, setNewMessage] = useState([]);
//   const [users, setUsers] = useState([]);

//   const handleNewMessageChange = (event) => {
//     setNewMessage(event.target.value);
//   };

//   const handleSendMessage = () => {
//     sendMessage(newMessage);
//     setNewMessage("");
//   };

//   const socketRef = useRef();

//   useEffect(() => {
//     socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
//       query: { roomId }
//     });

//     socketRef.current.on("userList", (userList) => {
//       setUsers(userList);
//     });

//     return () => {
//       socketRef.current.disconnect();
//     };

//   }, [roomId]);

//   return (
//     <div className="chat-room-container">
//       <div className="room-id">Room id: {roomId}</div>
//       <div className="users-list">
//         <h3>Users in the Room:</h3>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>{user.username}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="messages-container">
//         <ol className="messages-list">
//           {messages.map((message, i) => (
//             <li
//               key={i}
//               className={`message-item ${
//                 message.sender === username ? "my-message" : "received-message"
//               }`}
//             >
//               {message.sender}: {message.body}
//             </li>
//           ))}
//         </ol>
//       </div>
//       <textarea
//         value={newMessage}
//         onChange={handleNewMessageChange}
//         placeholder="Enter New Message..."
//         className="new-message-input-field"
//       ></textarea>
//       <button onClick={handleSendMessage} className="send-message-button">
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatRoom;
