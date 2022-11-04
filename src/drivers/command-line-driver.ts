/**
 * Command line driver that will be used to control the command line. It can flush the command line, use different colors, and allows for the loggers to log to the command line.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { CLIDefaultColors, CLIFgColors, CLIBgColors } from "../type-def/enums";
import { CLIColorProfile, CLIMessageBuffer, CommandLineDriverConfig, CommandLinePayload } from "../type-def/types";


const fs = require("fs");


export class CommandLineDriver {
  static defaultPrintMesssage: string = "";
  static defaultColorProfile: CLIColorProfile = {
    background: CLIBgColors.Black,
    foreground: CLIFgColors.White,
  };
  static defaultPrintType: string = "log";

  private _colorProfile: CLIColorProfile = CommandLineDriver.defaultColorProfile;
  private _CLIPayloadBuffer: CommandLinePayload; // allows for one storage at a time//

  constructor(config: CommandLineDriverConfig = {}) {
    this.flushConsole(); // flushing console so we have fresh start every time
    this.log("CommandLineDriver is initializing...");


    if (config.colorProfile) {
      this._colorProfile = config.colorProfile;
    }
    
  }

  // common stdout //
  public log(message: string) {
    this.send({
      type: "log",
      message: message,
      color: {
        foreground: CLIFgColors.Blue
      } as CLIColorProfile,
    });
  }
  
  public error(message: string)
  {
    this.send({
      type: "error",
      message: message,
      color: {
        background: CLIBgColors.Black,
        foreground: CLIFgColors.Red,
      }
    });
  }

  public warning(message: string)
  {
    this.send({
      type: "warning",
      message: message,
      color: {
        background: CLIBgColors.Yellow,
        foreground: CLIFgColors.White,
      } as CLIColorProfile,
    });
  }

  public message(message: string, from?: string, color?: CLIColorProfile)
  {
    this.send({
      type: from ? from : "message",
      message: message,
      color: {
        background: CLIBgColors.Yellow,
        foreground: CLIFgColors.White,
      } as CLIColorProfile,
    });
  }

  // common stdout //
  
  

  // clr stdout //
  
  /**
   * Flushes the console. 
   * @todo implement flushConsole
   */
  public flushConsole() {
    console.log('');
  }
  
  public clear() {
    this.send({
      color: {
        background: CLIBgColors.Black,
        foreground: CLIFgColors.White,
      },
    })
    console.clear();
  }
  // clr stdout //
  


  private send(message: CommandLinePayload | string) {
    if (typeof message === 'string') {
      this.stdoutDefault(message);
    } else {
      this.stdoutWithColor(message);
    }
  }



  private applyColorProfile(colorProfile: CLIColorProfile) {
    this._colorProfile = colorProfile;
  }
  private colorProfileToMessageTag(msgTag: string): string {
    const { background, foreground, modifiers } = this._colorProfile;

    let clcpBuffer = "";
    clcpBuffer += modifiers ? modifiers : "";
    clcpBuffer += background ? `${background}` : "";
    clcpBuffer += foreground ? `${foreground}` : "";


    let compiledCLCPStrring = `${clcpBuffer}[${msgTag.toUpperCase()}]${CLIDefaultColors.Reset}: `;
    return compiledCLCPStrring;
  }

  private stdoutWithColor(message: CommandLinePayload) {
    if (typeof message.message === 'undefined') {
      message.message = CommandLineDriver.defaultPrintMesssage;
    }
    if (typeof message.color === 'undefined') {
      message.color = CommandLineDriver.defaultColorProfile;
    }
    if (typeof message.type === 'undefined') {
      message.type = CommandLineDriver.defaultPrintType;
    }

    this.applyColorProfile(message.color);
    this._CLIPayloadBuffer = message;

    this.customConsoleColorPrint();


  }

  private customConsoleColorPrint() {
    const { background, foreground, modifiers } = this._colorProfile;
    if (!modifiers){
      
    }
    
    const msgPrefix = this.colorProfileToMessageTag(this._CLIPayloadBuffer.type);
    const msg = this._CLIPayloadBuffer.message;

    console.log(`${msgPrefix}${msg}`);
  }


  private stdoutDefault(message: string) {
    // I think I will need to use 
    console.log(message);
  }



}
