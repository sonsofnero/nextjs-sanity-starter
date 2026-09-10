import {ExampleSlice} from '../../components/slices/exampleSlice/exampleSlice'

export function Example() {
  return (
    <main>
      <ExampleSlice
        _type="exampleSlice"
        _key="example"
        eyebrow="Example slice"
        heading="Start here and replace this with your own content."
        body="This slice exists to show the path from schema to query to component. Duplicate its structure when you add your first real module."
        tone="default"
        padding_top="80"
        padding_bottom="80"
      />
    </main>
  )
}
