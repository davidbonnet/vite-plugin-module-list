import { render } from "preact";
import { Suspense, lazy } from "preact/compat";

import MODULE_LIST from "./pages";

const PAGE_LIST = MODULE_LIST.map(({ path, module }) => {
  const name = path.slice(0, -4);
  return {
    path: `/${name.toLowerCase()}`,
    name,
    Page: lazy(module),
  };
});

function Index() {
  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {PAGE_LIST.map(({ path, name }) => (
          <li key={path}>
            <a href={path}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Switch({ path = "/" }) {
  const match = PAGE_LIST.find((view) => view.path === path);
  if (match === undefined) {
    return <Index />;
  }
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <a href="/">Back</a>
      <match.Page />
    </Suspense>
  );
}

export function App() {
  const { pathname } = window.location;
  return <Switch path={pathname} />;
}

render(<App />, document.getElementById("app") as HTMLElement);
