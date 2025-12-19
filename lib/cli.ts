#!/usr/bin/env node

import mri from "mri";
import { loadConfigFromFile } from "vite";

type Options = {
  config?: string;
  help?: boolean;
  plugin?: string | readonly string[];
};

/**
 * Uses the vite configuration file provided as argument `--config` or finds it using `getViteConfigurationPath`.
 * Then, it loads the configuration and extracts the list of `moduleList` plugin instances.
 */
async function main(argv: string[]) {
  try {
    const options = mri<Options>(argv, {
      alias: {
        c: "config",
        h: "help",
        p: "plugin",
      },
      boolean: ["help"],
      string: ["config", "plugin"],
    });

    if (options.help) {
      // eslint-disable-next-line no-console
      console.log(`
Usage: vite-plugin-module-list [options]

Runs the vite-plugin-module-list plugin instances defined in a Vite configuration file to generate module lists without running a full Vite build.

If additional plugin names are provided via '--plugin', also runs the specified plugin instances' 'config' method.

Options:
  -c, --config <path>   Optional path to the Vite configuration file.
  -h, --help            Show this help message.
  -p, --plugin <name>   Optional name of specific plugin instances to run.
      `);
      return;
    }

    const pluginNameList: readonly string[] = [
      "module-list",
      ...(options.plugin
        ? Array.isArray(options.plugin)
          ? options.plugin
          : [options.plugin]
        : []),
    ];

    const { path, config } =
      (await loadConfigFromFile(
        { command: "serve", mode: "production" },
        options.config,
      )) ?? {};

    if (!config) {
      throw new Error("Failed to load Vite configuration.");
    }

    // eslint-disable-next-line no-console
    console.log(`Using configuration file ${path}`);

    const pluginList =
      config.plugins?.filter(
        (plugin) =>
          plugin && "name" in plugin && pluginNameList.includes(plugin.name),
      ) ?? [];

    // eslint-disable-next-line no-console
    console.log(`Running ${pluginList.length} module-list plugin instances.`);

    for (const plugin of pluginList) {
      await (plugin as any).config();
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main(process.argv.slice(2));
