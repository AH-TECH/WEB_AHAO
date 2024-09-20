import React, { useEffect, useRef } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers/index";
import Button from "../../../../components/Button";

export const Component1 = ({ mode, setMode }) => {
  const socketAuto = useRef(null);
  const socketManual = useRef(null);

  useEffect(() => {
    if (!socketAuto.current) {
      socketAuto.current = new Socket();
      socketAuto.current.connectWebSocket(ROUTES.AUTO);
    }

    if (!socketManual.current) {
      socketManual.current = new Socket();
      socketManual.current.connectWebSocket(ROUTES.MANUAL);
    }

    socketManual.current.getMessage((receivedData) => {
      console.log(receivedData);
    });

    socketAuto.current.getMessage((receivedData) => {
      console.log(receivedData);
    });

    return () => {
      if (socketAuto.current) {
        socketAuto.current.disconnectWebSocket();
      }

      if (socketManual.current) {
        socketManual.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleManual = () => {
    setMode("MANUAL");
    if (socketManual.current) {
      socketManual.current.sendMessage("MANUAL");
    }
  };

  const handleAuto = () => {
    setMode("AUTO");
    if (socketAuto.current) {
      socketAuto.current.sendMessage("AUTO");
    }
  };

  const Buttons = [
    { title: "AUTO", handleButton: handleAuto },
    { title: "MANUAL", handleButton: handleManual },
  ];

  return (
    <div className="flex space-x-4 border border-dashed border-gray-500 p-10 rounded-lg">
      {Buttons.map((item, index) => (
        <Button
          key={index}
          title={item.title}
          handleButton={item.handleButton}
          mode={mode}
        />
      ))}
    </div>
  );
};
