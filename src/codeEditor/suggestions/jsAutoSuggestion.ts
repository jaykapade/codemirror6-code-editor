/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompletionContext, CompletionResult } from "@codemirror/autocomplete";
import { scopeCompletionSource } from "@codemirror/lang-javascript";

const JSAutoSuggestions = async (context: CompletionContext) => {
  const result = await scopeCompletionSource(globalThis)(context);
  return dataTransform(result as CompletionResult);
};

function dataTransform({ from, options, validFor }: CompletionResult) {
  const newOptions: any = [];
  for (const opt of options) {
    newOptions.push({
      ...opt,
      label: opt.label,
      detail: opt.type,
    });
  }
  return {
    from,
    options: newOptions,
    validFor,
  };
}

export default JSAutoSuggestions;
