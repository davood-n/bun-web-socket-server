

declare interface CommandLineCommand {
  name: string,
  description?: string,
  aliases?: Array<string>,
  action: (args?: Array<string> | any) => void,
  // options?: Array<CommandLineCommandOption>
}
