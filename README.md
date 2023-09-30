# Vite plugin: Module list

🧶 Vite plugin that generates a module that automatically imports modules of a given folder.

### Key features

- Writes a simple module that imports all modules of a specified folder.
- Outputs different exports styles (dynamic, static, with or without file extension).
- Handles JavaScript/TypeScript and CSS modules.
- Automatically updates when files are added, removed, or renamed to the specified folder.
- Optionally formats the written module using Prettier.
- Works with [Vite](http://vitejs.dev) 2.x and onward.

## Installation

```bash
npm install vite-plugin-module-list
```

## Import

```js
import moduleList from "vite-plugin-module-list";
```

## API

Please checkout the [API documentation](./doc/README.md) for a full list of available options.

The default exported function returns a regular Vite plugin object. It adds hook that sets a file change listener on the Vite development server.

```js
import { resolve } from "path";
import moduleList from "vite-plugin-module-list";

export default defineConfig({
  plugins: [
    moduleList({
      rootPath: resolve("src/pages"),
      outputPath: resolve("src/pages.ts"),
      includeExtensions: ["tsx"],
      formatOptions: {
        trailingComma: "all",
      },
    }),
  ],
});
```

## Example

With the example configuration above, and the `pages.ts` will be generated:

```diff
src/
+ pages.ts
  pages/
    A.css
    A.tsx
    A.test.tsx
    B.css
    B.tsx
    C.tsx
    README.md
```

It will contain:

```js
// File automatically generated by `vite-plugin-module-list`
export default [
  { path: "A.tsx", module: () => import("./pages/A.tsx") },
  { path: "B.tsx", module: () => import("./pages/B.tsx") },
  { path: "C.tsx", module: () => import("./pages/C.tsx") },
];
```

Note that the CSS and test files are excluded. This behavior can be overridden with the `include`, `exclude`, and `includeExtensions` options.

It can then be imported in another module that wraps the dynamic imports with a `lazy` decorator:

```jsx
import MODULE_LIST from "./pages";

const PAGE_LIST = MODULE_LIST.map(({ path, module }) => {
  const name = path.slice(0, -4);
  return {
    path: `/${name.toLowerCase()}`,
    name,
    Page: lazy(module),
  };
});
```
