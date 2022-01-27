import * as vscode from "vscode";
import * as vscodeExtra from "../vscodeExtra";
import { IScript } from "..";

const esmRequire = require("esm")(module);

const run = async (args?: IScript): Promise<boolean> => {
  const scriptPath = args?.script;
  if (!scriptPath) {
    vscode.window.showErrorMessage(`Can't find script.`);
    return false;
  }

  const scriptInfo = await esmRequire(scriptPath);
  const script = scriptInfo.default;
  if (typeof script !== "function") {
    vscode.window.showErrorMessage(`Can't find script function.`);
    return false;
  }

  try {
    await script({
      vscode,
      vscodeExtra,
      args,
    });
  } catch (error: any) {
    vscode.window.showErrorMessage(
      `Run script error. Error message: ${error?.message}`
    );
  }

  return true;
};

export default run;

export const runCaseCommandId = "script.run";

export const regist = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand(runCaseCommandId, run)
  );
};
