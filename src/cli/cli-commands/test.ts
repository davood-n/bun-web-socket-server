/**
 * test
 */

class Test implements CommandLineCommand {
  name = 'print';
  description = `The 'print' command is called with any argument. The argument will be printed to console.`;
  aliases = ['dsc'];
  action(args: Array<string>) {
    args.forEach(arg => {
      console.log(arg);
    });
  }
}

export default new Test();