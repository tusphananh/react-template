import "./App.css";
import deleteIcon from "./image/delete.png";
import callIcon from "./image/call.png";
import endIcon from "./image/end.png";
import muteIcon from "./image/mute.png";
import audioIcon from "./image/audio.png";
import React, { useState, useEffect, Component } from "react";
import JsSIP from "jssip";
require('dotenv').config()

JsSIP.debug.disable("JsSIP:*");
var socket
var configuration
var ua

// fetch(`/api/key`).then(response => response.json()).then(state =>{
//   socket = new JsSIP.WebSocketInterface(state.ws);
//   configuration = {
//     sockets: [socket],
//     uri: state.uri,
//     password: state.password,
//     session_timers: false,
//   };
  

//   ua = new JsSIP.UA(configuration);
//   ua.start();
// });

socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");

configuration = {
    sockets: [socket],
    uri: "107@2-test1.gcalls.vn:50061",
    password: "test1107",
    session_timers: false,
};
  

ua = new JsSIP.UA(configuration);
ua.start();

var pos;
let duration = 0;
var timer;
let address = "Unknown";
let internetProtocol  = "Unknown";
const ipUrl ="https://api.ipify.org?format=json";

 
  fetch(ipUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      
      internetProtocol = jsonData.ip

    })
    .catch((error) => {
      // handle your errors here
      console.error(error);
    });
navigator.geolocation.getCurrentPosition(function (position) {
  pos = {
    lng: position.coords.longitude,
    lat: position.coords.latitude,
  };
 
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    pos.lng +
    "," +
    pos.lat +
    ".json?access_token=pk.eyJ1IjoidHVzcGhhbmFuaCIsImEiOiJja244eDFyMGkwM3R5MnVvbzI1eWZsYzNuIn0.jm4MGKDtKDMBpLz8IUXyAA";

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      // jsonData is parsed json object received from url
      address = jsonData.features[0].place_name;
    })
    .catch((error) => {
      // handle your errors here
      console.error(error);
    });

});


// Register callbacks to desired call events
var eventHandlers = {
  progress: function (e) {
    console.log("call is in progress");
    showCallingContainer();
    setStatusText("Ringing");
   
  },
  failed: function (e) {
    console.log("call failed with cause ");
    setCallButton();
    setStatusText("Call Fail");
    if (timer) {
      clearInterval(timer);
      duration = 0;
    }
    audio = null
    session = null
  },
  ended: function (e) {
    console.log("call ended with cause ");
    setCallButton();
    setStatusText("Call End");
    if (timer) {
      clearInterval(timer);
      duration = 0;
    }
    audio = null
    session = null
  },
  confirmed: function (e) {
    console.log("call confirmed");
    timer = setInterval(() => {
    
      setStatusText(fomatDuration(duration));
      duration++;
    }, 1000);
  },
};


var options = {
  eventHandlers: eventHandlers,
  mediaConstraints: { audio: true, video: false },
};
var session;
var audio;
function startCallAudio(phoneNumber) {
  session = ua.call(phoneNumber, options);
  if (session) {
    session.connection.addEventListener("addstream", (e) => {
      audio = document.createElement("audio");
      audio.srcObject = e.stream;
      audio.play();
    });
  }
}


function fomatDuration(time) {
  // Hours, minutes and seconds

  var secs = ~~time % 60;
  var mins = ~~(time / 60);
  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (mins > 9) {
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  } else {
    ret += "0" + mins + ":" + (secs < 10 ? "0" : "");
  }

  ret += "" + secs;
  return ret;
}

function setStatusText(status) {
  const statusText = document.getElementById("status-text");
  statusText.innerHTML = status;
}

function setCallButton() {
  const callButton = document.getElementById("call-button");
  const bol = callButton.getAttribute("iscalling");
  // Incall
  if (bol === "true") {
    if (session) {
      ua.terminateSessions(options);
    }
    callButton.setAttribute("iscalling", "false");
    showNumpad();
  }
  // OutCall
  else {
    callButton.setAttribute("iscalling", "true");
    showCallingContainer();
  }
}

function onAudio(e) {
  
  const target = e.target;
  if (target.getAttribute("isactive") === "true") {
    audio.muted = true;
    target.style.opacity = "0.6";
    target.setAttribute("isactive", "false");
  } else {
    audio.muted = false;
    target.style.opacity = "1";
    target.setAttribute("isactive", "true");
  }
}

function onMute(e) {
 
  const target = e.target;
  if (target.getAttribute("isactive") === "true") {
    target.style.opacity = "0.6";
    target.setAttribute("isactive", "false");
    if (session) {
      session.mute({ audio: true });
    }
  } else {
    target.style.opacity = "1";
    target.setAttribute("isactive", "true");
    if (session) {
      session.unmute({ audio: true });
    }
  }
}

function hideCallingContainer() {
  const callingContainer = document.getElementById("calling-container");
  callingContainer.style.animation = "hide  1.5s forwards";
  callingContainer.addEventListener("animationend", () => {
    callingContainer.style.animation = "";
    callingContainer.style.display = "none";
    callingContainer.style.opacity = "0";
  });
}

function showCallingContainer() {
  const deleteButton = document.getElementById("delete-button");
  const callingContainer = document.getElementById("calling-container");
  callingContainer.style.display = "flex";
  callingContainer.style.animation = "show  1.5s forwards";
  callingContainer.addEventListener("animationend", () => {
    callingContainer.style.animation = "";
    callingContainer.style.display = "flex";
    callingContainer.style.opacity = "1";
  });

  deleteButton.style.opacity = "0";
  deleteButton.style.pointerEvents = "none";
  hideNumpad();

  const callButton = document.getElementById("call-button");
  callButton.src = endIcon;
}

function hideNumpad() {
  const numpad = document.getElementById("numpad");
  numpad.style.animation = "hide  1.5s forwards";
  numpad.addEventListener("animationend", () => {
    numpad.style.animation = "";
    numpad.style.display = "none";
    numpad.style.opacity = "0";
  });
}

function showNumpad() {
  const deleteButton = document.getElementById("delete-button");
  const numpad = document.getElementById("numpad");

  numpad.style.display = "flex";
  numpad.style.animation = "show  1.5s forwards";
  numpad.addEventListener("animationend", () => {
    numpad.style.animation = "";
    numpad.style.display = "flex";
    numpad.style.opacity = "1";
  });
  deleteButton.style.opacity = "1";
  deleteButton.style.pointerEvents = "auto";
  hideCallingContainer();

  const callButton = document.getElementById("call-button");
  callButton.src = callIcon;
}

const getDevice = () => {
  let device = "Unknown";
  const ua = {
    "Generic Linux": /Linux/i,
    Android: /Android/i,
    BlackBerry: /BlackBerry/i,
    Bluebird: /EF500/i,
    "Chrome OS": /CrOS/i,
    Datalogic: /DL-AXIS/i,
    Honeywell: /CT50/i,
    iPad: /iPad/i,
    iPhone: /iPhone/i,
    iPod: /iPod/i,
    macOS: /Macintosh/i,
    Windows: /IEMobile|Windows/i,
    Zebra: /TC70|TC55/i,
  };
  Object.keys(ua).map((v) => navigator.userAgent.match(ua[v]) && (device = v));
  return device.charAt(0).toUpperCase() + device.slice(1);
};

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");

  function call(e) {
    const target = e.target;

    if (target === e.currentTarget) {
      target.style.animation = "fade 0.5s forwards";
      target.addEventListener("animationend", () => {
        target.style.animation = "";
      });

      if (phoneNumber != "") {
        startCallAudio(phoneNumber);
        setCallButton();
      }
    }
  }

  function click(e) {
    const target = e.target;

    if (target === e.currentTarget) {
      target.style.animation = "fade 0.5s forwards";
      target.addEventListener("animationend", () => {
        target.style.animation = "";
      });
      setPhoneNumber(
        phoneNumber + target.attributes.getNamedItem("value").value
      );
      
    }
  }
  function deleteNum(e) {
    setPhoneNumber(phoneNumber.slice(0, -1));
  }
  return (
    <div className="App">
      <div id="phone">
        <div id="wrapper">
          <p id="phone-number" number="">
            {phoneNumber}
          </p>
          <div id="function-container">
            <div id="numpad">
              <div className="button-container">
                <div onClick={click} className="key" value="1">
                  1<span>&nbsp;</span>
                </div>
                <div onClick={click} className="key" value="2">
                  2<span>abc</span>
                </div>
                <div onClick={click} className="key" value="3">
                  3<span>def</span>
                </div>
              </div>

              <div className="button-container">
                <div onClick={click} className="key" value="4">
                  4<span>ghi</span>
                </div>
                <div onClick={click} className="key" value="5">
                  5<span>jkl</span>
                </div>
                <div onClick={click} className="key" value="6">
                  6<span>mno</span>
                </div>
              </div>
              <div className="button-container">
                <div onClick={click} className="key" value="7">
                  7<span>pqrs</span>
                </div>
                <div onClick={click} className="key" value="8">
                  8<span>tuv</span>
                </div>
                <div onClick={click} className="key" value="9">
                  9<span>wxyz</span>
                </div>
              </div>
              <div className="button-container">
                <div
                  onClick={click}
                  id="special-button-left"
                  className="key special"
                  value="*"
                >
                  *
                </div>
                <div onClick={click} className="key" value="0">
                  0<span>+</span>
                </div>
                <div
                  onClick={click}
                  id="special-button-right"
                  className="key special"
                  value="#"
                >
                  #
                </div>
              </div>
            </div>
            <div id="calling-container">
              <p id="status-text" style={{ fontWeight: "bold" }}>
                Ringing
              </p>
              
              <p
                id="device-text"
                style={{
                  margin: "3px",
                }}
              >
                {getDevice()}
              </p>
              <p
                id="ip-text"
                style={{
                  margin: "3px",
                }}
              >
                {internetProtocol}
              </p>
              <p
                id="location-text"
                style={{
                  margin: "3px",
                }}
              >
                {address}
              </p>
              <div className="button-container">
                <img
                  id="mute-button"
                  onClick={onMute}
                  isactive="true"
                  src={muteIcon}
                  alt=""
                />
                <img
                  id="audio-button"
                  onClick={onAudio}
                  isactive="true"
                  src={audioIcon}
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="button-container">
            <div style={{ width: "75px", height: "75px" }}></div>
            <img
              id="call-button"
              iscalling="false"
              onClick={call}
              style={{
                width: "65px",
                height: "65px",
                margin: "10px",
                padding: 0,
              }}
              src={callIcon}
              alt=""
            />
            <img
              id="delete-button"
              onClick={deleteNum}
              style={{ width: "25px", margin: "13px", paddingLeft: "20px" }}
              src={deleteIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
