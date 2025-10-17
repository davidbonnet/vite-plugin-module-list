import { getGlobal } from "@nevoland/get-global";
import { render } from "preact";

import { App } from "./App.tsx";
import { observeDarkMode } from "./tools.ts";

import "./main.css";

observeDarkMode((isDark) => {
  getGlobal().document?.body.classList[isDark ? "add" : "remove"]("dark");
});

render(<App />, getGlobal().document?.getElementById("app")!);
