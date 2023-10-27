import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../ChatRoom/chat.css"
function Home() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUsername]= useState("");
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
    
  }
  const handleNameChange=(e)=>{
    setUsername(e.target.value);
  }
  // console.log(roomName,userName)
  

  return (
    <div className="page-container">
      <header className="join-header">
        <i className="fas fa-smile join-logo"></i>
        <h1 className="page-title">LocalChat</h1>
      </header>
      <main className="join-main">
        <form>
          <div className="form-control">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={userName}
              id="username"
              onChange={handleNameChange}
              placeholder="Enter username..."
              required
              className="input-field"
            />
          </div>
          <div className="form-control">
            <label className="form-label">Room</label>
            <input
              type="text"
              value={roomName}
              placeholder="Enter Room Name..."
              onChange={handleRoomNameChange}
              required
              className="input-field"
            />
          </div>
          <Link to={`/${roomName}/${userName}`}>
            <button type="submit" className="join-button">Join Chat</button>
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Home;




// -----------------------------------------------------------------
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import "../ChatRoom/chat.css";

// function Home() {
//   const [roomName, setRoomName] = useState('');
//   const [username, setUsername] = useState('');

//   const handleRoomNameChange = (e) => {
//     setRoomName(e.target.value);
//   }

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   }

//   return (
//     <div className="page-container">
//       <header className="join-header">
//         <i className="fas fa-smile join-logo"></i>
//         <h1 className="page-title">LocalChat</h1>
//       </header>
//       <main className="join-main">
//         <form>
//           <div className="form-control">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               placeholder="Enter username..."
//               value={username}
//               onChange={handleUsernameChange}
//               required
//               className="input-field"
//             />
//           </div>
//           <div className="form-control">
//             <label className="form-label">Room</label>
//             <input
//               type="text"
//               value={roomName}
//               placeholder="Enter Room Name..."
//               onChange={handleRoomNameChange}
//               required
//               className="input-field"
//             />
//           </div>
//           <Link to={`/${roomName}?username=${username}`}>
//             <button type="submit" className="join-button">Join Chat</button>
//           </Link>
//         </form>
//       </main>
//     </div>
//   );
// }

// export default Home;
