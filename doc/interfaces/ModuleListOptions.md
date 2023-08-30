[vite-plugin-module-list](../README.md) / ModuleListOptions

# Interface: ModuleListOptions

Plugin options.

## Table of contents

### Properties

- [formatOptions](ModuleListOptions.md#formatoptions)
- [outputPath](ModuleListOptions.md#outputpath)
- [rootPath](ModuleListOptions.md#rootpath)

## Properties

### formatOptions

• `Optional` **formatOptions**: ``false`` \| `Options`

Prettier options. If explicitely set to false, the code is not formatted.

**`See`**

FormatOptions for the list of options.

#### Defined in

[main.ts:74](https://github.com/davidbonnet/vite-plugin-module-list/blob/ea5290e/lib/main.ts#L74)

___

### outputPath

• `Optional` **outputPath**: `string`

Path to the module into wich the module list is written.

**`Default Value`**

`${rootPath}/main.ts`.

#### Defined in

[main.ts:68](https://github.com/davidbonnet/vite-plugin-module-list/blob/ea5290e/lib/main.ts#L68)

___

### rootPath

• `Optional` **rootPath**: `string`

Path to the folder containing the modules to list.

**`Default Value`**

`"."`

#### Defined in

[main.ts:62](https://github.com/davidbonnet/vite-plugin-module-list/blob/ea5290e/lib/main.ts#L62)
