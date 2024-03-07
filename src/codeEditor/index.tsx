/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

// CodeMirror Base Setup
import { basicSetup } from "codemirror";
import { linter } from "@codemirror/lint";
import { Annotation, EditorState, Extension } from "@codemirror/state";
import { EditorView, ViewUpdate, placeholder } from "@codemirror/view";
import { autocompletion } from "@codemirror/autocomplete";

// CodeMirror Language Support
import { html } from "@codemirror/lang-html";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript";

// CodeMirror Linters
import jsLinter from "./linters/jsLinter";

// CodeMirror Autocomplete
import JSAutoSuggestions from "./suggestions/jsAutoSuggestion";

// Editor Theme
import { themeLightInit } from "./theme";

const External = Annotation.define<boolean>();

const lintOptions = {
  javascript: { esversion: 11, browser: true, asi: true, undef: false },
};

const linterLang = {
  json: linter(jsonParseLinter()),
  javascript: jsLinter(lintOptions["javascript"]),
};

const autoComplete = {
  javascript: javascriptLanguage.data.of({
    autocomplete: JSAutoSuggestions,
  }),
};

const languageFormatting = {
  json: json(),
  html: html(),
  javascript: javascript(),
} as const;

const baseExtensions = [
  basicSetup,
  autocompletion(),
  // Theme for the editor
  themeLightInit(),
];

export type languageType = keyof typeof languageFormatting;

type EditorProps = {
  language: languageType;
  value: string;
  onChange?: (value: string) => void;
  fontSize?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  placeholder?: string | HTMLElement;
};

const Editor: React.FC<EditorProps> = ({
  language = "javascript",
  value,
  onChange = () => {},
  height = null,
  minHeight = null,
  maxHeight = null,
  width = null,
  minWidth = null,
  maxWidth = null,
  fontSize = "11pt",
  placeholder: placeHolderStr = "",
}) => {
  const editorRef = useRef<HTMLElement>(null);
  const [extensions, setExtensions] = useState<Extension[]>(baseExtensions);

  const useThemeOptions = EditorView.theme({
    "&": {
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
      fontSize,
      textAlign: "left", // keeps cursor to left
    },
    "& .cm-scroller": {
      height: "100% !important",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
    "& .cm-gutters": {
      backgroundColor: "#f6f6f6",
      border: "none",
    },
    "& .cm-tooltip": {
      borderRadius: "8px !important",
      overflow: "hidden !important",
      background: "white !important",
    },
    "& .cm-tooltip-autocomplete": {
      "& > ul": {
        "& > li": {
          "&:hover:not([aria-selected='true'])": {
            backgroundColor: "#e5f1ff",
          },
          "&[aria-selected='true']": {
            "& .cm-completionDetail": {
              color: "white",
              opacity: 0.85,
            },
          },
          "& .cm-completionIcon": {
            display: "none",
          },
          "& .cm-completionLabel": {},
          "& .cm-completionMatchedText": {
            textDecoration: "none !important",
            fontWeight: 600,
          },
          "& .cm-completionDetail": {
            textDecoration: "none !important",
            color: "#808080",
            paddingRight: "8px !important",
            float: "right",
            fontStyle: "normal",
          },
        },
      },
    },
    "& .cm-diagnostic-error": {
      backgroundColor: "#ffeaea",
    },
    "& .cm-diagnostic-warning": {
      backgroundColor: "#fff9e0",
    },
  });

  const updateListener = EditorView.updateListener.of((vu: ViewUpdate) => {
    if (
      vu.docChanged &&
      // Fix echoing of the remote changes:
      // If transaction is market as remote we don't have to call `onChange` handler again
      !vu.transactions.some((tr: any) => tr.annotation(External))
    ) {
      const doc = vu.state.doc;
      const value = doc.toString();
      onChange(value);
    }
  });

  useEffect(() => {
    const exts: any = [];
    const langFormat = languageFormatting[language];
    const linter = (linterLang as any)[language];
    const autoSuggestion = (autoComplete as any)[language];

    if (langFormat) exts.push(langFormat);
    if (linter) exts.push(linter);
    if (autoSuggestion) exts.push(autoSuggestion);
    setExtensions((prev) => [...prev, ...exts]); // add language specific extensions
  }, [language]);

  useEffect(() => {
    if (editorRef.current === null) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          useThemeOptions,
          updateListener,
          placeholder(placeHolderStr),
          ...extensions,
        ],
      }),
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
  }, [editorRef.current]);
  return (
    <Box
      ref={editorRef}
      sx={{
        width: "100%",
        position: "relative",
      }}
    />
  );
};

export default Editor;
