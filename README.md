> ### You may be looking for a tool to create scripts with VS Code extension capabilities, [Power Tools](https://marketplace.visualstudio.com/items?itemName=egomobile.vscode-powertools) is a better choice.

# Script

Create scripts with VS Code extension capabilities.

## Install via CLI

```bash
code --install-extension zjffun.scripts
```

## Usage

### Create a script

```js
export default ({ vscodeExtra }) => {
  const { replaceSelections } = vscodeExtra;
  replaceSelections((text) => {
    return JSON.stringify(text.split("\n"), null, 2);
  });
};
```

### Config keyboard shortcuts

```json
{
  "key": "cmd+5 l",
  "command": "script.run",
  "args": {
    "script": "[script path]"
  }
}
```

### Run script

<img src="images/run-script.webp" width="700px">

## Release Notes

### [TODO]

### [Unreleased]

### v0.0.1

- Added features run scripts.
