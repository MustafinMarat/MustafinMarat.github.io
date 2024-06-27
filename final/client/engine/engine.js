import { vec3 } from "./src/mth/mth_vec3.js";
import { renderer } from "./src/rnd/rnd.js";
import * as unit from "./src/units/units.js";

let playerName, playerColor, players = {}, me;

// Main project function
function main() {
  const rnd = renderer("#glCanvas");

  me = unit.playerUnit(rnd, playerColor);
  unit.plateUnit(rnd, 30, 0);
  let shoot = unit.shootingUnit(rnd, playerColor);
  unit.crossUnit(rnd);
  //unit.testUnit(rnd);

  let socket = new WebSocket("ws:/localhost:3030");
  let chatWindow = document.querySelector("#playersWindow");
  {
    let newPlayer = document.createElement('div');
    newPlayer.id = playerName;
    newPlayer.innerText = playerName;
    chatWindow.appendChild(newPlayer);
  }

  if (window.socket == undefined)
    window.socket = socket;

  socket.onopen = (event) => {
    socket.send(JSON.stringify({type: "connect", text: playerName, color: playerColor}));
  };

  socket.onmessage = (event) => {
    let info = JSON.parse(event.data);
    if (info.type == "newPlayer") {
      players[info.data.name] = unit.enemyUnit(rnd, info.data.name, vec3(info.data.pos), vec3(info.data.color));
      if (info.data.name) {
        let newPlayer = document.createElement('div');
        newPlayer.id = info.data.name;
        newPlayer.innerText = info.data.name;
        chatWindow.appendChild(newPlayer);
      }
    }
    if (info.type == "start") 
      for (let character in info.data)
        if (character != playerName) {
          players[character] = unit.enemyUnit(rnd, character, vec3(info.data[character].pos), vec3(info.data[character].color));
          let newPlayer = document.createElement('div');
          newPlayer.id = character;
          newPlayer.innerText = character;
          chatWindow.appendChild(newPlayer);
        }
    if (info.type == "setPos")
      for (let character in info.data)
        if (character != playerName)
          if (players[character]) {
            players[character].getPos(info.data[character].pos);
            players[character].getDir(info.data[character].dir);
          }
    if (info.type == "playerClose") {
      players[info.data].close();
      delete players[info.data];
      let toDel =  document.getElementById(info.data);
      toDel.remove();
    }
    if (info.type == "shoot") {
      shoot.addHit(vec3(info.data.start), vec3(info.data.end), vec3(info.data.color));
      if (info.data.hit == playerName) {
        me.hp--;
        document.querySelector("#healthPoints").textContent = `HP: ${me.hp}`;
        if (me.hp <= 0) 
          window.location.href = "/index.html";
      }
    }
  };

  setInterval(() => {
    socket.send(JSON.stringify({type: "myPos", name: playerName, pos: me.pos, dir: rnd.cam.dir}));
  }, 10);

  setInterval(() => {
    document.querySelector("#title").textContent = `MM6 FPS: ${rnd.timer.FPS}`;
  }, 1000);
} // End of 'main' function


window.addEventListener("load", () => {
  playerName = sessionStorage.getItem("name");
  playerColor = vec3(parseInt(sessionStorage.getItem("color").slice(1, 3), 16) / 255, 
                     parseInt(sessionStorage.getItem("color").slice(3, 5), 16) / 255, 
                     parseInt(sessionStorage.getItem("color").slice(5, 7), 16) / 255);
  main();
});
