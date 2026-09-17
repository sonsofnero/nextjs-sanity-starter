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
    if (path === `${root}/components/slices/sliceTypes.ts`) {
      // Simulate a second generated slice without touching schema or TypeGen output.
      return source.replace(
        "export type PageBuilderBlock = NonNullable<PageData['modules']>[number]",
        "export type PageBuilderBlock = NonNullable<PageData['modules']>[number] | {_type: 'testSlice'; _key: string; count: number}",
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
  const sliceTypes = `${root}/components/slices/sliceTypes.ts`
  const program = ts.createProgram(
    [`${root}/components/slices/pageBuilder.tsx`],
    {
      ...parsed.options,
      incremental: false,
      typeRoots: [`${root}/node_modules/@types`],
    },
    host,
  )
  expect(program.getSourceFile(sliceTypes)?.text).toContain("_type: 'testSlice'")
  const errors = ts
    .getPreEmitDiagnostics(program)
    .filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)
  expect(
    errors.map((error) =>
      ts.flattenDiagnosticMessageText(error.messageText, '\n'),
    ),
  ).toEqual([])
}, 15_000)
