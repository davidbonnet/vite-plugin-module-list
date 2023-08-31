vite-plugin-module-list

# vite-plugin-module-list

## Table of contents

### Type Aliases

- [Mode](README.md#mode)
- [ModuleListOptions](README.md#modulelistoptions)

### Functions

- [default](README.md#default)

## Type Aliases

### Mode

Ƭ **Mode**: ``"full-dynamic"`` \| ``"named-static"`` \| ``"named-static-no-extension"``

Generation mode:
- `full-dynamic`: Every found module is listed in an array with a `{ path, module: () => import() }` object description, `module` being a callback that does a dynamic import.
- `named-static`: Every found module has a reference of the same module name being re-exported.
- `named-static-no-extension`: Same as `named-static` except that imports do not include the file name extension.

#### Defined in

[main.ts:51](https://github.com/davidbonnet/vite-plugin-module-list/blob/636d790/lib/main.ts#L51)

___

### ModuleListOptions

Ƭ **ModuleListOptions**: `Object`

Plugin options.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `formatOptions?` | `FormatOptions` \| ``false`` | Prettier options. If explicitely set to false, the code is not formatted. **`See`** FormatOptions for the list of options. |
| `includeExtensions?` | `string`[] | Module file name extensions to include. Files with other extensions are ignored. **`Default Value`** `["js", "ts", "jsx", "tsx"]` |
| `mode?` | [`Mode`](README.md#mode) | Specifies how the modules are listed and exported. **`Default Value`** ```ts "full-dynamic" ``` |
| `outputPath?` | `string` | Path to the module into wich the module list is written. **`Default Value`** `${rootPath}/main.ts`. |
| `rootPath?` | `string` | Path to the folder containing the modules to list. **`Default Value`** `"."` |

#### Defined in

[main.ts:12](https://github.com/davidbonnet/vite-plugin-module-list/blob/636d790/lib/main.ts#L12)

## Functions

### default

▸ **default**(`options`): `PluginOption`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ModuleListOptions`](README.md#modulelistoptions) | See [ModuleListOptions](README.md#modulelistoptions) |

#### Returns

`PluginOption`

A vite plugin that writes a module that dynamically imports modules found in a folder.

#### Defined in

[main.ts:172](https://github.com/davidbonnet/vite-plugin-module-list/blob/636d790/lib/main.ts#L172)
