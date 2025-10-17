import build from "pino-abstract-transport";

export default function stdoutTransport() {
  return build(
    async (source) => {
      for await (const message of source) {
        // eslint-disable-next-line no-console
        console.log(
          `${new Date(message.time).toISOString()} ${source.levels.labels[message.level].toUpperCase()} ${JSON.stringify(message)}`,
        );
      }
    },
    {
      expectPinoConfig: true,
    },
  );
}
