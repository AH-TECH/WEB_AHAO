import React, { useEffect, useRef } from "react";
import Socket from "../../../../ws";

export const Component1 = ({ mode, setMode }) => {
  const socketAuto = useRef(null);

  useEffect(() => {
    if (!socketAuto.current) {
      socketAuto.current = new Socket();
      socketAuto.current.connectWebSocket("ws://localhost:5000/PLC1/Auto");
    }

    return () => {
      if (socketAuto.current) {
        socketAuto.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleManual = () => {
    setMode("MANUAL");
    if (socketAuto.current) {
      socketAuto.current.sendMessage("Auto disconnect");
    }
  };

  const handleAuto = () => {
    setMode("AUTO");
    if (socketAuto.current) {
      socketAuto.current.sendMessage(1);
    }
  };

  return (
    <div className="flex space-x-4 border border-dashed border-gray-500 p-10 rounded-lg">
      <button
        className={`btn hover:text-white ${
          mode === "AUTO" ? "btn-success" : "btn-active"
        }`}
        onClick={handleAuto}
      >
        AUTO
      </button>
      <button
        className={`btn hover:text-white ${
          mode === "MANUAL" ? "btn-success" : "btn-active"
        }`}
        onClick={handleManual}
      >
        MANUAL
      </button>
    </div>
  );
};
