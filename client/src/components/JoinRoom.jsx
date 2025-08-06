import { useState } from 'react';

const JoinRoom = ({ onJoin }) => {
  const [roomId, setRoomId] = useState('');

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl mb-4 font-bold">Join a Room</h2>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
      />
      <button
        onClick={() => onJoin(roomId)}
        className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
      >
        Join
      </button>
    </div>
  );
};

export default JoinRoom;