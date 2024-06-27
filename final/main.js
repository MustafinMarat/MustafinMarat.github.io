import http from "node:http";
import express from "express";
import { WebSocketServer } from "ws";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let players = {};

function main() {
  wss.on("connection", async (ws) => {
    ws.on("message", (message) => {
      let info = JSON.parse(message.toString());
      if (info.type == "connect") {
        if (players[info.text] != undefined)
          ws.send(JSON.stringify({type: "nameError", data: "Name is already used"}));
        else {
          if (ws.id == undefined)
            ws.id = info.text;
          players[info.text] = {pos: {x: 0, y: 0, z: 0}, color: info.color};
          for (let client of wss.clients)
            if (client != ws)
              client.send(JSON.stringify({type: "newPlayer", data: {name: info.text, pos: {x: 0, y: 0, z: 0}, color: info.color}}));
        }
      }
      if (info.type == "myPos") {
        players[info.name].pos = info.pos;
        players[info.name].dir = info.dir;
      }
      if (info.type == "shoot") {
        for (let client of wss.clients)
          if (client != ws)
            client.send(JSON.stringify({type: "shoot", data: {start: info.start, end: info.end, hit: info.hit, color: info.color}}));
      }
    });

    ws.on("close", () => {
      delete players[ws.id];
      for (let client of wss.clients)
        if (client != ws)
          client.send(JSON.stringify({type: "playerClose", data: ws.id}));
    });

    ws.send(JSON.stringify({type: "start", data: players}));
  });
}


main();

setInterval(() => {
  for (let client of wss.clients)
    client.send(JSON.stringify({type: "setPos", data: players}));
}, 10);

const port = 3030;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server started on http://${host}:${port}`);
});
