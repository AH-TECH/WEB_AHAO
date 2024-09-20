import React, { useState, useRef, useEffect } from "react";
import Socket from "../../../../ws";
import ROUTES from "../../../../ws/routers/index"

export const InputComponent = () => {
  const [getText, setText] = useState("");
  const [data, setData] = useState(null);
  const socketInput = useRef(null);

  useEffect(() => {
    if (!socketInput.current) {
      socketInput.current = new Socket();
      socketInput.current.connectWebSocket(ROUTES.SEARCH_IP);
    }

    socketInput.current.getMessage((receivedData) => {
      setData(JSON.parse(receivedData));
    });

    return () => {
      if (socketInput.current) {
        socketInput.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleChangeValue = (e) => {
    setText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      socketInput.current.sendMessage(getText);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <input
        id="ip-input"
        type="text"
        value={getText}
        placeholder="Nhập IP máy..."
        className="input input-bordered input-accent w-full max-w-xs"
        onChange={handleChangeValue}
        onKeyDown={handleEnter}
      />

      {data && (
        <div
          className={`text-sm font-medium p-2 rounded-md ${
            data.Status === 1
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {data.Message}
        </div>
      )}
    </div>
  );
};
