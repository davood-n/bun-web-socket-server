


export enum RouteType {
  WEB,
  WEB_SOCKET,
}



// ----------- CLI Enums ----------//

export enum CLIDefaultColors {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",
}

export enum CLIBgColors {
  Black = "\x1b[40m",
  Red = "\x1b[41m",
  Green = "\x1b[42m",
  Yellow = "\x1b[43m",
  Blue = "\x1b[44m",
  Magenta = "\x1b[45m",
  Cyan = "\x1b[46m",
  White = "\x1b[47m"
}

export enum CLIFgColors {
  Black = "\x1b[30m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m"
}
//----------- End CLI Enums --------//


// ---------- WebSocket Enums ---------//
export const enum WebSocketClientConnectionRole {
  ADMIN = -1,
  SUBOPERATOR = 1,
  MASTERAGENT = 2,
  AGENT = 3,
  PLAYER = 4,
}
// ---------- End WebSocket Enums -----//

