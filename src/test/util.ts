import * as vscode from "vscode";

export async function writeTextDocument(
  textDocument: vscode.TextDocument,
  content: string
) {
  const workspaceEdit = new vscode.WorkspaceEdit();

  workspaceEdit.replace(
    textDocument.uri,
    new vscode.Range(0, 0, textDocument.lineCount, 0),
    content
  );

  await vscode.workspace.applyEdit(workspaceEdit);

  return true;
}
