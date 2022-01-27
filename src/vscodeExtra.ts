import * as vscode from "vscode";

export const replaceSelections = async (
  replaceFn: (text: string) => string
) => {
  const { activeTextEditor } = vscode.window;
  if (!activeTextEditor?.document) {
    return false;
  }

  const workspaceEdit = new vscode.WorkspaceEdit();

  for (const selection of activeTextEditor.selections) {
    const text = activeTextEditor.document.getText(selection);

    workspaceEdit.replace(
      activeTextEditor.document.uri,
      selection,
      replaceFn(text)
    );
  }

  return await vscode.workspace.applyEdit(workspaceEdit);
};
