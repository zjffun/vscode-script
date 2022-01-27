import * as assert from "assert";
import { join } from "path";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { run } from "../../commands";
import { writeTextDocument } from "../util";

suite("Extension", () => {
  const extensionID = "zjffun.scripts";
  const extensionShortName = "script";

  let extension: vscode.Extension<any> | undefined;

  extension = vscode.extensions.getExtension(extensionID);

  setup(async () => {});

  teardown(async () => {});

  test("All package.json commands should be registered in extension", (done) => {
    if (!extension) {
      throw Error("can't find extension");
    }

    const packageCommands = extension.packageJSON.contributes.commands.map(
      (c: any) => c.command
    );

    // get all extension commands excluding internal commands.
    vscode.commands.getCommands(true).then((allCommands) => {
      const activeCommands = allCommands.filter((c) =>
        c.startsWith(`${extensionShortName}.`)
      );

      activeCommands.forEach((command) => {
        const result = packageCommands.some((c: any) => c === command);
        assert.ok(result);
      });

      done();
    });
  });

  test("run command should work", async () => {
    const doc = await vscode.workspace.openTextDocument();
    const editor = await vscode.window.showTextDocument(doc);

    await writeTextDocument(doc, "1\n2");

    const originalText = doc.getText();

    await vscode.commands.executeCommand("editor.action.selectAll");

    await vscode.commands.executeCommand(run.runCaseCommandId, {
      script: join(
        __dirname,
        "../../../",
        "src/test/script-test/lines-to-json.js"
      ),
    });

    assert.strictEqual(doc.getText(), JSON.stringify(originalText.split("\n")));
  });
});
