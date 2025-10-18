[**vite-plugin-module-list**](../README.md)

***

[vite-plugin-module-list](../README.md) / ModuleListOptions

# Type Alias: ModuleListOptions

> **ModuleListOptions** = `object`

Defined in: [types/ModuleListOptions.ts:8](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L8)

Plugin options.

## Properties

### exclude?

> `optional` **exclude**: `RegExp`

Defined in: [types/ModuleListOptions.ts:38](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L38)

Regular expression that matches file names to exclude. Files that match the `include` regular expression but match the `exclude` regular expression will be excluded.

#### Default Value

`/\.(?:tests?|spec)\.[^.]+$/`

***

### formatOptions?

> `optional` **formatOptions**: `FormatOptions` \| `false`

Defined in: [types/ModuleListOptions.ts:50](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L50)

Prettier options. If explicitely set to false, the code is not formatted.

#### See

FormatOptions for the list of options.

***

### include?

> `optional` **include**: `RegExp`

Defined in: [types/ModuleListOptions.ts:32](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L32)

Regular expression that matches file names to include. Files that do not match will be excluded.

#### Default Value

`/(?:)/`

***

### includeExtensions?

> `optional` **includeExtensions**: `string`[]

Defined in: [types/ModuleListOptions.ts:26](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L26)

Module file name extensions to include. Files with other extensions are ignored.

#### Default Value

`["js", "ts", "jsx", "tsx"]`

***

### mode?

> `optional` **mode**: [`Mode`](Mode.md) \| [`Mode`](Mode.md)\[`"language"`\]

Defined in: [types/ModuleListOptions.ts:14](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L14)

Specifies how the modules are listed and exported.

#### Default Value

```ts
"js"
```

***

### outputPath?

> `optional` **outputPath**: `string`

Defined in: [types/ModuleListOptions.ts:44](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L44)

Path to the module into wich the module list is written.

#### Default Value

`${rootPath}/main.ts`.

***

### recursive?

> `optional` **recursive**: `boolean`

Defined in: [types/ModuleListOptions.ts:62](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L62)

Whether to read the directory recursively or not.

#### Default Value

`false`

***

### rootPath?

> `optional` **rootPath**: `string`

Defined in: [types/ModuleListOptions.ts:20](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L20)

Path to the folder containing the modules to list.

#### Default Value

`"."`

***

### watch?

> `optional` **watch**: `boolean`

Defined in: [types/ModuleListOptions.ts:56](https://github.com/davidbonnet/vite-plugin-module-list/blob/e4be6ce9f04cb8e5198072904b7bfd824c61c467/lib/types/ModuleListOptions.ts#L56)

Whether it should watch for changes or not.

#### Default Value

`true`
