import { useState } from "react";
import { MenuItem, Select, Stack } from "@mui/material";

import Editor, { languageType } from "./codeEditor";

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [lang, setLang] = useState<languageType>("javascript");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLangChange = (event: any) => {
    setLang(event.target.value);
  };

  return (
    <Stack gap={2}>
      <h1>Codemirror 6 : Code Editor</h1>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        label="Select a Language"
        onChange={handleLangChange}
        sx={{
          background:'white'
        }}
      >
        <MenuItem value={'json'}>JSON</MenuItem>
        <MenuItem value={'html'}>HTML</MenuItem>
        <MenuItem value={'javascript'}>Javascript</MenuItem>
      </Select>
      <Editor
        language={lang}
        value={value}
        onChange={(val) => setValue(val)}
        height="65vh"
        width="80vw"
        key={lang}
      />
    </Stack>
  );
}

export default App;
