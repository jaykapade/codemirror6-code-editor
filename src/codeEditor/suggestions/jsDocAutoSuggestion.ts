import { syntaxTree } from "@codemirror/language";

const tagOptions = [
  "constructor",
  "deprecated",
  "link",
  "param",
  "returns",
  "type",
].map((tag) => ({
  label: "@" + tag,
  type: "keyword",
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JSAutoSuggestions = (context: any) => {
  const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (
    nodeBefore.name !== "BlockComment" ||
    context.state.sliceDoc(nodeBefore.from, nodeBefore.from + 3) !== "/**"
  )
    return null;
  const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos);
  const tagBefore = /@\w*$/.exec(textBefore);
  if (!tagBefore && !context.explicit) return null;
  return {
    from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
    options: tagOptions,
    validFor: /^(@\w*)?$/,
  };
};

export default JSAutoSuggestions;
