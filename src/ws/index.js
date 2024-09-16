import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket(url);

    // When the WebSocket is opened
    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened.");

      // Send a message every 2 seconds
    //   const intervalId = setInterval(() => {
    //     if (socketRef.current.readyState === WebSocket.OPEN) {
    //       socketRef.current.send("Ping from client");
    //     }
    //   }, 2000);

    //   // Clear interval when component unmounts
    //   return () => clearInterval(intervalId);
    };

    // When a message is received from the server
    socketRef.current.onmessage = (event) => {
      console.log("Message from server: ", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // When the WebSocket is closed
    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Handle any WebSocket errors
    socketRef.current.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      socketRef.current.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
