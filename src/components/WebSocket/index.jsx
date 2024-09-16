import React from 'react';
import useWebSocket from '../../ws';


const WebSocketComponent = () => {
  const { messages, sendMessage } = useWebSocket('ws://localhost:5000/PLC1/Auto');

  return (
    <div>
      <h1>WebSocket Continuous Signal Test</h1>
      <div>
        {messages.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))
        )}
      </div>
      <button onClick={() => sendMessage("Manual Ping from client")}>
        Send Manual Ping
      </button>
    </div>
  );
};

export default WebSocketComponent;
