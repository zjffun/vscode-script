export default ({ vscodeExtra }) => {
  const { replaceSelections } = vscodeExtra;
  return replaceSelections((text) => {
    return JSON.stringify(text.split("\n"));
  });
};
