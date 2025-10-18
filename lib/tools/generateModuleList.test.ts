import { expect, test } from "vitest";

import { generateModuleList } from "./generateModuleList.js";

test("generates a dynamic module list for TypeScript", async () => {
  expect(
    generateModuleList(
      [
        "/root/path/lib/a.ts",
        "/root/path/lib/b.ts",
        "/root/path/lib/c.ts",
        "/root/path/lib/d/1.ts",
        "/root/path/lib/d/2.ts",
        "/root/path/lib/d/3.ts",
      ],
      "/root/path",
      "/root/path/lib.ts",
      { dynamic: true, extension: "js", language: "ts" },
    ),
  ).toMatchSnapshot();
});

test("generates a dynamic module list for JavaScript", async () => {
  expect(
    generateModuleList(
      [
        "/root/path/lib/a.ts",
        "/root/path/lib/b.ts",
        "/root/path/lib/c.ts",
        "/root/path/lib/d/1.ts",
        "/root/path/lib/d/2.ts",
        "/root/path/lib/d/3.ts",
      ],
      "/root/path",
      "/root/path/lib.ts",
      { dynamic: true, language: "js" },
    ),
  ).toMatchSnapshot();
});

test("generates a module list for TypeScript", async () => {
  expect(
    generateModuleList(
      [
        "/root/path/lib/a.ts",
        "/root/path/lib/b.ts",
        "/root/path/lib/c.ts",
        "/root/path/lib/d/1.ts",
        "/root/path/lib/d/2.ts",
        "/root/path/lib/d/3.ts",
      ],
      "/root/path",
      "/root/path/lib.ts",
      { extension: true, language: "ts" },
    ),
  ).toMatchSnapshot();
});

test("generates a module list for JavaScript", async () => {
  expect(
    generateModuleList(
      [
        "/root/path/lib/a.js",
        "/root/path/lib/b.js",
        "/root/path/lib/c.js",
        "/root/path/lib/d/1.js",
        "/root/path/lib/d/2.js",
        "/root/path/lib/d/3.js",
      ],
      "/root/path",
      "/root/path/lib.js",
      { extension: true, language: "js" },
    ),
  ).toMatchSnapshot();
});

test("generates a types module list for TypeScript", async () => {
  expect(
    generateModuleList(
      [
        "/root/path/lib/a.ts",
        "/root/path/lib/b.ts",
        "/root/path/lib/c.ts",
        "/root/path/lib/d/1.ts",
        "/root/path/lib/d/2.ts",
        "/root/path/lib/d/3.ts",
      ],
      "/root/path",
      "/root/path/lib.ts",
      { extension: true, language: "ts", type: true },
    ),
  ).toMatchSnapshot();
});
