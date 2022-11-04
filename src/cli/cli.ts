/**
 * This file is the handler for the seperate Command Line Interface thread. This thread will be responsible for accepting input from the user and then sending it to the main thread. The main thread will then be responsible for sending the input to the CommandRegistry and then sending the output back to the CLI thread.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { spawn } from "bun";

let count = 1;

export const listenProcess = async (cmdDriver) => {

  await Bun.stdin.text().then((input) => {
    console.log(`count: ${count}`);
    cmdDriver.recieve(input);
    count++;
    listenProcess(cmdDriver);
  });
}


