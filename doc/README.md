vite-plugin-module-list

# vite-plugin-module-list

## Table of contents

### Type Aliases

- [Mode](README.md#mode)
- [ModeCss](README.md#modecss)
- [ModeJs](README.md#modejs)
- [ModeTs](README.md#modets)
- [ModuleListOptions](README.md#modulelistoptions)

### Functions

- [default](README.md#default)

## Type Aliases

### Mode

Ƭ **Mode**: [`ModeJs`](README.md#modejs) \| [`ModeTs`](README.md#modets) \| [`ModeCss`](README.md#modecss)

Generation mode.

#### Defined in

types/Mode.ts:8

___

### ModeCss

Ƭ **ModeCss**: `Object`

CSS mode.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `language` | ``"css"`` | Generate a CSS module. |

#### Defined in

types/ModeCss.ts:4

___

### ModeJs

Ƭ **ModeJs**: `Object`

JavaScript mode.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dynamic?` | ``true`` | Generate a module that dynamically imports the module. |
| `extension?` | ``true`` | Include the module file name extension when importing the module. |
| `language` | ``"js"`` | Generate a JavaScript module. |

#### Defined in

types/ModeJs.ts:4

___

### ModeTs

Ƭ **ModeTs**: `Object`

TypeScript mode.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dynamic?` | ``true`` | Generate a module that dynamically imports the module. |
| `extension?` | ``true`` | Include the module file name extension when importing the module. |
| `language` | ``"ts"`` | Generate a TypeScript module. |
| `type?` | ``true`` | Use the `type` keyword when importing the module. |

#### Defined in

types/ModeTs.ts:4

___

### ModuleListOptions

Ƭ **ModuleListOptions**: `Object`

Plugin options.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `exclude?` | `RegExp` | Regular expression that matches file names to exclude. Files that match the `include` regular expression but match the `exclude` regular expression will be excluded. **`Default Value`** `/\.(?:tests?\|spec)\.[^.]+$/` |
| `formatOptions?` | `FormatOptions` \| ``false`` | Prettier options. If explicitely set to false, the code is not formatted. **`See`** FormatOptions for the list of options. |
| `include?` | `RegExp` | Regular expression that matches file names to include. Files that do not match will be excluded. **`Default Value`** `/(?:)/` |
| `includeExtensions?` | `string`[] | Module file name extensions to include. Files with other extensions are ignored. **`Default Value`** `["js", "ts", "jsx", "tsx"]` |
| `mode?` | [`Mode`](README.md#mode) \| [`Mode`](README.md#mode)[``"language"``] | Specifies how the modules are listed and exported. **`Default Value`** ```ts "full-dynamic" ``` |
| `outputPath?` | `string` | Path to the module into wich the module list is written. **`Default Value`** `${rootPath}/main.ts`. |
| `rootPath?` | `string` | Path to the folder containing the modules to list. **`Default Value`** `"."` |

#### Defined in

types/ModuleListOptions.ts:7

## Functions

### default

▸ **default**(`options`): `PluginOption`

Vite plugin that writes a module that imports modules found in a folder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ModuleListOptions`](README.md#modulelistoptions) | See [ModuleListOptions](README.md#modulelistoptions) |

#### Returns

`PluginOption`

A vite plugin that writes a module that imports modules found in a folder.

#### Defined in

tools/moduleList.ts:13
