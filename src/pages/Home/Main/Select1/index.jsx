import React, { useState, useEffect } from "react";
import Socket from "../../../../ws";
import { Component1 } from "./Component1";
import { Component2 } from "./Component2";
import { Component3 } from "./Component3";
import { Pump } from "./Pump";
import { InputComponent } from "./InputComponent";

const index = () => {
  const [mode, setMode] = useState("MANUAL");
  const [waterLevel, setWaterLevel] = useState(60); // Water level percentage
  const [pump1Status, setPump1Status] = useState(false);
  const [pump2Status, setPump2Status] = useState(false);
  const Pumps = [
    { name: "pump1", status: pump1Status, setPump: setPump1Status },
    { name: "pump2", status: pump2Status, setPump: setPump2Status },
  ];
  let socketMainPLC1 = new Socket();
  // let socketManual = new Socket();
  // let socketPump1 = new Socket();
  // let socketPump2 = new Socket();
  // init socket of plc1 state
  useEffect(() => {
    socketMainPLC1.connectWebSocket("ws://localhost:5000/PLC1/Pump/Stutus");
    socketMainPLC1.getMessage();
  }, []);

  return (
    <div className="p-10 flex flex-col items-center space-y-8">
      <div className="w-[90%] flex justify-between items-center">
        <Component1 mode={mode} setMode={setMode} />
        <InputComponent/>
         
        {/* <Component2 /> */}
      </div>
      {/* <div className="w-[90%] flex justify-between items-center h-[400px] gap-10">
 
        <Component3 waterLevel={waterLevel} />
       
        <div className="flex space-x-16 border border-dashed border-gray-500 p-10 rounded-lg w-[80%] h-full">
        
          {Pumps.map((i, index) => (
            <Pump
              key={index}
              status={i.status}
              mode={mode}
              setPump={i.setPump}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default index;
