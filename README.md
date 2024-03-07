# Creating a CodeMirror 6 Code Editor in Vite React

## Introduction

Hey Guys I was tired of searching through all the documentation and examples around the web to make a code editor using [`Codemirror 6`](https://codemirror.net/). So I made this guide to walk you through the process of setting up a [`CodeMirror 6`](https://codemirror.net/) code editor in a Vite React project. The code editor has provided support for languages like JavaScript, JSON, and HTML. Additionally, it also includes auto-suggestions for JavaScript and error/warning handling for both JavaScript and JSON.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (18+ lts) installed on your machine.

## Getting Started

1. **Create a new Vite React project:**

   ```bash
   npx create-vite my-code-editor --template react
   cd my-code-editor

   ```

2. **Install CodeMirror 6 and necessary plugins:**

   ```bash
   npm install \
     @codemirror/autocomplete \
     @codemirror/commands \
     @codemirror/lang-html \
     @codemirror/lang-javascript \
     @codemirror/lang-json \
     @codemirror/language \
     @codemirror/lint \
     @codemirror/state \
     @codemirror/view \
     @uiw/codemirror-themes \
     codemirror \
     events \
     jshint \
     @types/jshint
   ```

3. **Create the CodeMirror component:**
   You can refer this from the codeEditor folder All linters etc are configured with comments

4. **Run the server:**

   ```npm run dev ```

5. **Open your browser and navigate to http://localhost:3000 to see your CodeMirror 6 code editor in action.**

## Features and Contributions

Feel free to explore additional features to add to the project. Some ideas for further enhancements include:

  - **Code Formatting:** Implement a feature for formatting code within the editor. Eg: Currently from my research [`js-beautify`](https://www.npmjs.com/package/js-beautify) can assist in formatting JavaScript , HTML and CSS code but has only few language support unlike monaco editor.
    
  - **Additional Language Support:** Extend language support to include more programming languages.  

Feel free to dive in, explore, and contribute! Whether you're forking the project, submitting pull requests, opening issues, or exploring creative enhancements, we hope this serves as a helpful starting point for understanding CodeMirror 6. `Happy coding!`

