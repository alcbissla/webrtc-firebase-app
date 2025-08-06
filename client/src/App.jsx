import { useState } from 'react';
import JoinRoom from './components/JoinRoom';
import ChatRoom from './components/ChatRoom';

function App() {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      {!joined ? (
        <JoinRoom onJoin={(id) => { setRoomId(id); setJoined(true); }} />
      ) : (
        <ChatRoom roomId={roomId} />
      )}
    </div>
  );
}

export default App;