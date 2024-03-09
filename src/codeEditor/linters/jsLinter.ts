/* eslint-disable @typescript-eslint/no-explicit-any */
import { linter } from "@codemirror/lint";
import { JSHINT as jshint } from "jshint";

const createLintDiv = (severity: "warning" | "error", message: string) => {
  const outerDiv = document.createElement("div");
  outerDiv.style.cssText = "display: flex; justify-content: start;";

  const imgDiv = document.createElement("div");
  imgDiv.style.cssText =
    "align-items: start; margin-left: -2px; padding-top: 4px;";

  const img = document.createElement("img");
  img.src =
    severity === "warning"
      ? "https://utfs.io/f/2e77f9f5-0bc6-45c6-95f0-94368fcee4ed-ilgs64.svg"
      : "https://utfs.io/f/cd9b39d0-d02a-4d6f-8372-fb6185ba33d7-1lmfpk.svg";

  imgDiv.appendChild(img);

  const textDiv = document.createElement("div");
  textDiv.style.cssText =
    "margin-left: 6px; padding-top: 3px; align-items: start;";

  textDiv.textContent = message;

  outerDiv.appendChild(imgDiv);
  outerDiv.appendChild(textDiv);

  return outerDiv;
};

const jsLinter = (lintOptions: any) => {
  return linter((view) => {
    const diagnostics: any[] = [];
    const codeText = view.state.doc.toJSON();
    jshint(codeText, lintOptions);
    const errors = jshint.data()?.errors;
    const warnings = jshint.data()?.unused;

    if (errors && errors.length > 0) {
      errors.forEach((error: any) => {
        const selectedLine = view.state.doc.line(error.line);

        const lintDiv = createLintDiv("error", error.reason);

        const diagnostic = {
          from: selectedLine.from,
          to: selectedLine.to,
          severity: "error",
          renderMessage: () => lintDiv,
          message: "",
        };

        diagnostics.push(diagnostic);
      });
    } else if (warnings && warnings.length > 0) {
      warnings.forEach((warning: any) => {
        const selectedLine = view.state.doc.line(warning.line);

        const lintDiv = createLintDiv(
          "warning",
          `'${warning.name}' is defined but not used`
        );

        const diagnostic = {
          from: selectedLine.from,
          to: selectedLine.to,
          severity: "warning",
          renderMessage: () => lintDiv,
          message: "",
        };

        diagnostics.push(diagnostic);
      });
    }
    return diagnostics;
  });
};

export default jsLinter;
