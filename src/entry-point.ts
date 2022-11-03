// entry-point.ts is the entry point for the application.

import { WebSocketDriver } from "./web-socket-driver";

const wsd = new WebSocketDriver();
wsd.serve();


// Bun.serve({
//   fetch(req, server) {
//     console.log(`Request: `, req);
//     console.log(`Server:  `, server);


//     const trimmedUrl = req.url.replace(root_url, '').trim();
//     if (trimmedUrl === "/chat") {
//       console.log("request for chat");
//       if (
//         server.upgrade(req, {
//           // This User object becomes ws.data
//           data: {
//             clientId: 1, // Need to make this dynamic eventually
//             name: "Friend",
//           },
//           // Pass along some headers to the client
//           headers: {
//             "Set-Cookie": "name=" + new URL(req.url).searchParams.get("name"),
//           },
//         })
//       )
//         return;
//     }
//     Object
//     return new Response("Invalid request.", { status: 400 });
//   },

//   websocket: {
//     open(ws) {
//       console.log("WebSocket opened");
//       console.log(ws);

//       // subscribe to "the-group-chat" topic
//       ws.subscribe("the-group-chat");
//     },

//     message(ws, message) {
//       // In a group chat, we want to broadcast to everyone
//       // so we use publish()
//       // ws.publish("the-group-chat", `${ws.data.name}: ${message}`);
//       ws.send(message);
//     },

//     close(ws: any, code: number, reason: string) {
//       ws.publish("the-group-chat", `${ws.data.name} left the chat`);
//     },

//     drain(ws) {
//       console.log("Please send me data. I am ready to receive it.");
//     },

//     // enable compression
//     perMessageDeflate: true,
//     /*
//     * perMessageDeflate: {
//        **
//        * Enable compression on the {@link ServerWebSocket}
//        *
//        * @default false
//        *
//        * `true` is equivalent to `"shared"
//        compress?: WebSocketCompressor | false | true;
//        **
//        * Configure decompression
//        *
//        * @default false
//        *
//        * `true` is equivalent to `"shared"
//        decompress?: WebSocketCompressor | false | true;
//     */

//     /**
//      * The maximum size of a message
//      */
//     // maxPayloadLength?: number;
//     /**
//      * After a connection has not received a message for this many seconds, it will be closed.
//      * @default 120 (2 minutes)
//      */
//     // idleTimeout?: number;
//     /**
//      * The maximum number of bytes that can be buffered for a single connection.
//      * @default 16MB
//      */
//     // backpressureLimit?: number;
//     /**
//      * Close the connection if the backpressure limit is reached.
//      * @default false
//      */
//     // closeOnBackpressureLimit?: boolean;

//     // this makes it so ws.data shows up as a Request object
//   },
//   // TLS is also supported with WebSockets
//   /**
//    * File path to a TLS key
//    *
//    * To enable TLS, this option is required.
//    */
//   // keyFile: "./key.pem",
//   /**
//    * File path to a TLS certificate
//    *
//    * To enable TLS, this option is required.
//    */
//   // certFile: "./cert.pem",
// });