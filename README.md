# Vite plugin: Module list

🧶 Vite plugin that writes a module that dynamically imports modules found in a folder.

### Key features

- Write a simple JavaScript module that dynamically imports all modules of a specified folder.
- Automatically updates when files are added, removed, or renamed to the specified folder.
- Optionally formats the written module using Prettier.

## Installation

```bash
npm install vite-plugin-module-list
```

## Import3

```js
import moduleList from "vite-plugin-module-list";
```

## API

The default exported function returns a regular Vite plugin object.

```js
import { resolve } from "path";
import moduleList from "vite-plugin-module-list";

export default defineConfig({
  plugins: [
    moduleList({
      rootPath: resolve("src/modules"),
      outputPath: resolve("src/main.ts"),
    }),
  ],
});
```

## Example

See this project's [`vite.config.ts`](./vite.config.ts) and [`src/main.ts`](./src/main.ts) files as an example usage.
