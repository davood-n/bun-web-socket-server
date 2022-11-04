import { CLIBgColors, CLIDefaultColors, CLIFgColors } from "./enums";

// ---------- Basic Types -------------//
export type Dictonary = {
  [prop: string]: any
}
// ---------- End Basic Types ---------//






// ---------- WebSocket Types ---------//
export type WebSocketDriverConfig = {
  port?: number,
  rootUrl?: string,

}; // WebSocketDriverConfig used to create a WebSocketDriver instance
export type ServerDriverConfig = {
  port?: number,
  rootUrl?: string,
}; // ServerDriverConfig used to create a ServerDriver instance
export type WebSocketPayload = { // WebSocketPayload is the payload that is sent to the client.
  action: string,
  data: any
};
export type WebSocketClientConnectionParams = { // Used to create a new WebSocketClientConnection instance
  id: string,
  channel: string,
  username: string
  latestMessage: WebSocketPayload, // message or payload
  messageLastSent: number, // Unix timestamp
  role: number,
};
// ---------- End WebSocket Types -----//




// ---------- CLI Types -----------//




export type CLIColorProfile = {
  foreground: CLIFgColors,
  background: CLIBgColors,
  modifiers?: CLIDefaultColors[]
}

export type CLIMessageBuffer = {
  message: string,
  type: string,
}

export type CommandLineDriverConfig = {
  colorProfile?: CLIColorProfile,
}

export type CommandLinePayload = { // CommandLinePayload is the payload that is sent to the server from the command line.
  type?: string,
  message?: string,
  color?: CLIColorProfile
  // ^^ These are all the acceptable payloads for color choice. 
};

// ---------- End CLI Types ---------//
