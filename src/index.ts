import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function (request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end('Hello World');
});

const wss = new WebSocketServer({ server });
let ucout = 0;
wss.on('error', console.error);

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    console.log("user connected", ++ucout);
    ws.send('Hello! You are connected to the server');
});

server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});