import React, { useState, useEffect } from "react";
import imgbump from "@assets/bump.png";
import imgbumperr from "@assets/bumperr.png";
import Socket from "../../../../ws";
 
const index = () => {
  const [mode, setMode] = useState("MANUAL");
  const [waterLevel, setWaterLevel] = useState(60); // Water level percentage
  const [pump1Status, setPump1Status] = useState(false);
  const [pump2Status, setPump2Status] = useState(false);
  const [pump, setPump] = useState({})

  let socketMainPLC1 = new Socket();
  let socketAuto = new Socket();
  let socketManual = new Socket();
  let socketPump1 = new Socket();
  let socketPump2 = new Socket();

  // init socket of plc1 state
  useEffect(() => {
    socketMainPLC1.connectWebSocket("ws://localhost:5000/PLC1/Pump/Stutus");
    socketMainPLC1.getMessage()
  }, [])

 const handleAuto =()=>{
  setMode("AUTO")
  if(socketManual.socket){
    socketManual.disconnectWebSocket("ws://localhost:5000/PLC1/Manual")
  }
  setPump1Status(true)
  setPump2Status(true)
  socketAuto.connectWebSocket('ws://localhost:5000/PLC1/Auto')
  socketPump1.connectWebSocket("ws://localhost:5000/PLC1/Pump1/On");
  socketPump2.connectWebSocket("ws://localhost:5000/PLC1/Pump2/On");
 }

 const handleManual = () => {
  setMode("MANUAL")
  if(socketAuto.socket){
    socketAuto.disconnectWebSocket("ws://localhost:5000/PLC1/Auto")
  }
  socketManual.connectWebSocket('ws://localhost:5000/PLC1/Manual')
 }

 const handlePump = (number, action) => {
  let url;
  let message;
  let disConnectUrl;

  if (number === 1) {
    if (action === "on") {
      setPump1Status(true);
      url = "ws://localhost:5000/PLC1/Pump1/On";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump1/Off"
      message = "1 on";
    } else {
      setPump1Status(false);
      url = "ws://localhost:5000/PLC1/Pump1/Off";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump1/On"
      message = "1 off";
    }
    if(socketPump1.socket){
      socketPump1.disconnectWebSocket(disConnectUrl)
    }
    socketPump1.connectWebSocket(url);
  } else if (number === 2) {
    if (action === "on") {
      setPump2Status(true);
      url = "ws://localhost:5000/PLC1/Pump2/On";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump2/Off"
      message = "2 on";
    } else {
      setPump2Status(false);
      url = "ws://localhost:5000/PLC1/Pump2/Off";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump2/On"
      message = "2 off";
    }
    if(socketPump2.socket){
      socketPump2.disconnectWebSocket(disConnectUrl)
    }
    socketPump2.connectWebSocket(url);
  }
  setPump({url: url, message: message})
 }

  return (
    <div className="p-10 flex flex-col items-center space-y-8">
      <div className="w-[90%] flex justify-between items-center">
        {/* Mode Selection */}
        <div className="flex space-x-4 border border-dashed border-gray-500 p-10 rounded-lg">
          <button
            className={`btn   hover:text-white ${
              mode === "AUTO" ? "btn-success" : "btn-active"
            }`}
            onClick={handleAuto}
          >
            AUTO
          </button>
          <button
            className={`btn   hover:text-white ${
              mode === "MANUAL" ? "btn-success" : "btn-active"
            }`}
            onClick={handleManual}
          >
            MANUAL
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex space-x-4 border border-dashed border-gray-500 p-10 rounded-lg ">
          <div class="btn btn-outline btn-success rounded-full w-20 h-20">
            AUTO
          </div>
          <div class="btn btn-outline btn-info rounded-full w-20 h-20">
            MANUAL
          </div>
          <div class="btn btn-outline  rounded-full w-20 h-20 btn-error">
            ERROR
          </div>
        </div>
      </div>

      <div className="w-[90%] flex justify-between items-center h-[400px] gap-10">
        {/* Water Tank */}
        <div className="flex flex-col items-center border border-dashed border-gray-500 p-10 rounded-lg h-full  ">
          <div className="relative w-32 h-64 bg-gray-400 rounded-md overflow-hidden">
            <div
              className="absolute bottom-0 bg-blue-300 w-full"
              style={{ height: `${waterLevel}%` }}
            ></div>
          </div>
          <p className="mt- font-bold">Bể nước {waterLevel}</p>
        </div>

        {/* Pump Controls */}
        <div className="flex space-x-16 border border-dashed border-gray-500 p-10 rounded-lg w-[80%] h-full">
          {/* Pump 1 */}
          <div className="flex flex-col items-center space-y-4 flex-1">
            <div className="w-60 h-60 border flex items-center justify-center object-cover">
              <img
                src={pump1Status ? imgbumperr : imgbump}
                alt="Hinh bom 1"
                className="w-full "
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="btn btn-success"
                disabled={mode === "AUTO"}
                onClick={() => handlePump(1, "on")}
              >
                START
              </button>
              <button
                className="btn btn-error"
                disabled={mode === "AUTO"}
                onClick={() => handlePump(1, "off")}
              >
                STOP
              </button>
            </div>
          </div>

          {/* Pump 2 */}
          <div className="flex flex-col items-center space-y-4 flex-1">
            <div className="w-60 h-60 border flex items-center justify-center object-cover">
              <img
                src={pump2Status ? imgbumperr : imgbump}
                alt="Hinh bom 1"
                className="w-full "
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="btn btn-success"
                disabled={mode === "AUTO"}
                onClick={() => handlePump(2, "on")}
              >
                START
              </button>
              <button
                className="btn btn-error"
                disabled={mode === "AUTO"}
                onClick={() => handlePump(2, "off")}
              >
                STOP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;