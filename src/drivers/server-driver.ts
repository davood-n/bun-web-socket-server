/**
 * Server driver that controls the websocket server. Server driver will use Bun.serve() to serve an appropriate websocket server.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { WebSocketDriver } from "./web-socket-driver";
import { ServerLogger } from "../loggers/server-logger";
import { CommandLineDriver } from "./command-line-driver";
import  { listenProcess } from "../cli/cli";



const defaultConfig = {};
export class ServerDriver {
  CommandLineDriver: CommandLineDriver
  WebSocketDriver: WebSocketDriver;
  ServerLogger: ServerLogger;
  port: number;
  rootUrl: string;
  count: any;

  private async cliHandler()
  {
    // console.log(rl);
    
    
    // await Bun.stdin.text().then((input) => {
    //   console.log(`count: ${this.count}`);
    //   this.CommandLineDriver.recieve(input);
    //   this.count++;
    //   listenProcess(this.CommandLineDriver);
    // });
  }
  /**
   * Constructor for ServerDriver class. The server driver should be able to create two seperate threads, one for the command line interface that controls the web socket server and one for the websocket server. This is a challegning task. I think if I create a thread with the CommandLineDriver, then create the logger instances on a seperate thread and then create the WebSocketDriver on a seperate thread, then I should be able to create a server that can be controlled from the command line and can also serve web sockets. First the CommandLineDriver intializes, and now accpets inputs into the CLI, and the ServerLogger, and WebSocketLogger.
   * @param config 
   */
  constructor(config: ServerDriverConfig = defaultConfig) {
    this.port = config.port || 3000;
    this.rootUrl = config.rootUrl || `http://0.0.0.0:${this.port}`;
    this.WebSocketDriver = new WebSocketDriver();
    console.log('SERVER: ServerDriver intizalizing...');
    this.ServerLogger = new ServerLogger();
    console.log('SERVER: ServerDriver created');
    this.count = 1;


    this.CommandLineDriver = new CommandLineDriver();
    this.cliHandler();

    // listenProcess(this.CommandLineDriver);
    
    // console.log(`bun ${import.meta.dir}/../cli/cli.ts`)
    // const { stdout } = spawn([], {
    //   stdin: Bun.stdin,
    //   stdout: Bun.stdout,
    // })
    // this.CommandLineDriver.recieve();
    
  }

  public serve() {
    Bun.serve({
      fetch: (req, server) => this.bunFetchHandler(req, server),
      websocket: this.WebSocketDriver.bunWebSocketHandler(),
    });
  }

  public realUrl(url) {
    let trimmedUrl = url.replace(this.rootUrl, '').trim();
    return trimmedUrl;
  }

  private bunFetchHandler(req: Request, server) {
    if (this.realUrl(req.url) === "/chat") {
      console.log("request for chat");
      if (
        server.upgrade(req, {
          // This User object becomes ws.data
          data: {
            clientId: 1, // Need to make this dynamic eventually
            name: "Friend",
          },
          // Pass along some headers to the client
          headers: {
            "Set-Cookie": "name=" + new URL(req.url).searchParams.get("name"),
          },
        })
      )
        return;
    }
    Object
    return new Response("Invalid request.", { status: 400 });
  }

}
