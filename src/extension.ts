import * as vscode from "vscode";
import * as commands from "./commands/index";

export let context: vscode.ExtensionContext;
export let activePromise: Promise<void>;

export function activate(extensionContext: vscode.ExtensionContext) {
  activePromise = (async () => {
    context = extensionContext;

    Object.values(commands).forEach((command) => {
      command?.regist?.(extensionContext);
    });
  })();
}

export function deactivate() {}
