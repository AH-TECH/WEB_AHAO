import imgbump from "@assets/bump.png";
import imgbumperr from "@assets/bumperr.png";
export const Pump = ({ status, mode, setPump }) => {
  const handlePump = (number, action) => {
    let url;
    let message;
    let disConnectUrl;
    if (action === "on") {
      setPump(true);
      url = "ws://localhost:5000/PLC1/Pump1/On";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump1/Off";
      message = "1 on";
    } else {
      setPump(false);
      url = "ws://localhost:5000/PLC1/Pump1/Off";
      disConnectUrl = "ws://localhost:5000/PLC1/Pump1/On";
      message = "1 off";
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4 flex-1">
      <div className="w-60 h-60 border flex items-center justify-center object-cover">
        <img
          src={status ? imgbumperr : imgbump}
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
  );
};
