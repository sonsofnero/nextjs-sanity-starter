import {fileURLToPath} from 'node:url'
import {resolve} from 'node:path'
import ts from 'typescript'
import {expect, it} from 'vitest'

it('compiles the real dispatcher after a second generated slice is registered', () => {
  const root = resolve(fileURLToPath(new URL('../..', import.meta.url)))
  const config = ts.readConfigFile(`${root}/tsconfig.json`, ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root)
  const host = ts.createCompilerHost(parsed.options)
  const readFile = host.readFile.bind(host)
  host.readFile = (path) => {
    const source = readFile(path)
    if (!source) return source
    if (path === `${root}/sanity/sanity.types.ts`) {
      // Simulate TypeGen output without changing the actual schema or generated file.
      return source.replace(
        /modules: Array<\{([\s\S]*?)\}> \| null/g,
        'modules: Array<{$1} | {_type: "testSlice"; _key: string; count: number}> | null',
      )
    }
    if (path === `${root}/components/slices/sliceRegistry.ts`) {
      return (
        source.replace(
          'exampleSlice: ExampleSlice,',
          'exampleSlice: ExampleSlice, testSlice: TestSlice,',
        ) +
        "\nfunction TestSlice(_props: SliceProps<'testSlice'>) { return null }\n"
      )
    }
    return source
  }
  // Fail visibly if a generator-format change would make the simulation a no-op.
  const generated = `${root}/sanity/sanity.types.ts`
  const program = ts.createProgram(
    [`${root}/components/slices/pageBuilder.tsx`],
    {
      ...parsed.options,
      incremental: false,
      typeRoots: [`${root}/node_modules/@types`],
    },
    host,
  )
  expect(program.getSourceFile(generated)?.text).toContain('_type: "testSlice"')
  const errors = ts
    .getPreEmitDiagnostics(program)
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
  expect(
    errors.map((error) =>
      ts.flattenDiagnosticMessageText(error.messageText, '\n'),
    ),
  ).toEqual([])
}, 15_000)
