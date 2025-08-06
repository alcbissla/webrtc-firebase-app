import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot, addDoc, collection } from 'firebase/firestore';

const ChatRoom = ({ roomId }) => {
  const localVideo = useRef();
  const remoteVideo = useRef();
  const pc = useRef(new RTCPeerConnection());
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const setup = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideo.current.srcObject = localStream;

      localStream.getTracks().forEach((track) => pc.current.addTrack(track, localStream));

      const roomRef = doc(db, 'rooms', roomId);
      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      await setDoc(roomRef, { offer: offer });

      onSnapshot(roomRef, async (snapshot) => {
        const data = snapshot.data();
        if (data?.answer && !pc.current.currentRemoteDescription) {
          await pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        }
      });

      pc.current.ontrack = (event) => {
        remoteVideo.current.srcObject = event.streams[0];
      };
    };

    setup();

    const chatRef = collection(db, 'rooms', roomId, 'messages');
    const unsub = onSnapshot(chatRef, (snapshot) => {
      const msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      setChat(msgs);
    });

    return () => unsub();
  }, [roomId]);

  const sendMessage = async () => {
    const chatRef = collection(db, 'rooms', roomId, 'messages');
    await addDoc(chatRef, {
      text: message,
      timestamp: Date.now()
    });
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl">Room: {roomId}</h2>
      <video ref={localVideo} autoPlay playsInline muted className="w-64 rounded border border-white" />
      <video ref={remoteVideo} autoPlay playsInline className="w-64 rounded border border-white" />
      <div className="bg-gray-700 p-2 rounded w-full max-w-md">
        <div className="h-40 overflow-y-auto mb-2">
          {chat.map((msg, i) => (
            <div key={i} className="text-sm border-b border-gray-600 py-1">{msg.text}</div>
          ))}
        </div>
        <div className="flex">
          <input value={message} onChange={e => setMessage(e.target.value)} className="flex-1 p-2 rounded-l bg-gray-600" />
          <button onClick={sendMessage} className="bg-blue-600 px-4 rounded-r">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;