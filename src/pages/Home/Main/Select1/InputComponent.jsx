import React, { useState, useRef, useEffect } from "react";
import Socket from "../../../../ws";

export const InputComponent = () => {
  const [getText, setText] = useState("");
  const socketAuto = useRef(null); // Dùng useRef để giữ đối tượng WebSocket

  useEffect(() => {
    // Khởi tạo WebSocket chỉ một lần khi component mount
    if (!socketAuto.current) {
      socketAuto.current = new Socket();
      socketAuto.current.connectWebSocket("ws://localhost:5000/PLC1/SearchIP");
    }

    // Ngắt kết nối WebSocket khi component unmount
    return () => {
      if (socketAuto.current) {
        socketAuto.current.disconnectWebSocket();
      }
    };
  }, []);

  const handleChangeValue = (e) => {
    setText(e.target.value); // Cập nhật giá trị input
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      // Gửi tin nhắn qua WebSocket khi nhấn Enter
      socketAuto.current.sendMessage(getText);
      console.log(getText); // Log giá trị vừa nhập
    }
  };

  return (
    <input
      type="text"
      value={getText}
      placeholder="Nhập IP máy..."
      className="input input-bordered input-accent w-full max-w-xs"
      onChange={handleChangeValue} // Cập nhật giá trị input khi người dùng gõ
      onKeyDown={handleEnter} // Gửi tin nhắn khi nhấn Enter
    />
  );
};
