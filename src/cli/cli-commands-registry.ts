/**
 * Commands registry class is the class that is responsible for registering and storing all commands.
 * @author Davood Najafi <davood@najafi.cc>
 */

export default class CommandsRegistry {
  private static _commands: Map<string, CommandLineCommand> = new Map<string, CommandLineCommand>();

  /**
   * Registers a command to the registry.
   * @param {CommandLineCommand} command The command to register.
   */
  public static registerCommand(command: CommandLineCommand): void {
    this._commands.set(command.name, command);
  }

  /**
   * Unregisters a command from the registry.
   * @param {CommandLineCommand} command The command to unregister.
   */
  public static unregisterCommand(command: CommandLineCommand) {
    this._commands.delete(command.name);
  }

  /**
   * 
   * @param {string} commandName The name of the command to retrieve. 
   * @returns {CommandLineCommand} The command that was retrieved. 
   */
  public static retrieveCommand(commandName: string): CommandLineCommand {
    return this._commands.get(commandName);
  }

  /**
   * Returns all commands in the registry.
   * @returns {Map<string, CommandLineCommand>} The map of all commands.
   */
  public static retrieveCommands(): Map<string, CommandLineCommand> {
    return this._commands;
  }

}
