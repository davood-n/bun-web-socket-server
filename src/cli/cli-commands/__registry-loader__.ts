/**
 * Export your commands here
 */

import CommandsRegistry from '../cli-commands-registry';

import CommandLineCommand from './test';

CommandsRegistry.registerCommand(CommandLineCommand);


export default  CommandsRegistry;