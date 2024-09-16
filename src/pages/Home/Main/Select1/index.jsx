import React, { useState } from "react";
import imgbump from "@assets/bump.png";
import imgbumperr from "@assets/bumperr.png";
import useWebSocket from "../../../../ws";
 
const index = () => {
  const { messages, sendMessage } = useWebSocket('ws://localhost:5000/PLC1/Auto');
  const [mode, setMode] = useState("MANUAL");
  const [waterLevel, setWaterLevel] = useState(60); // Water level percentage
  const [pump1Status, setPump1Status] = useState(false);
  const [pump2Status, setPump2Status] = useState(false);

 const handleAuto =()=>{
  setMode("AUTO")
  sendMessage(1)
 }
  return (
    <div className="p-10 flex flex-col items-center space-y-8">
      {messages && messages.map((i,index)=>(
        <h1 key={index}>{i}</h1>
      ))}
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
            onClick={() => setMode("MANUAL")}
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
                src={pump1Status ? imgbump : imgbumperr}
                alt="Hinh bom 1"
                className="w-full "
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="btn btn-success"
                disabled={mode === "AUTO"}
                onClick={() => setPump1Status(true)}
              >
                START
              </button>
              <button
                className="btn btn-error"
                disabled={mode === "AUTO"}
                onClick={() => setPump1Status(false)}
              >
                STOP
              </button>
            </div>
          </div>

          {/* Pump 2 */}
          <div className="flex flex-col items-center space-y-4 flex-1">
            <div className="w-60 h-60 border flex items-center justify-center object-cover">
              <img
                src={pump2Status ? imgbump : imgbumperr}
                alt="Hinh bom 1"
                className="w-full "
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="btn btn-success"
                disabled={mode === "AUTO"}
                onClick={() => setPump2Status(true)}
              >
                START
              </button>
              <button
                className="btn btn-error"
                disabled={mode === "AUTO"}
                onClick={() => setPump2Status(false)}
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
