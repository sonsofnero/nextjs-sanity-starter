import {ExampleSlice} from '../../components/slices/exampleSlice/exampleSlice'

export function Example() {
  return (
    <main>
      <ExampleSlice
        _type="exampleSlice"
        _key="example"
        eyebrow="Example slice"
        heading="Start here and replace this with your own content."
        content={[
          {
            _type: 'block',
            _key: 'intro',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: 'text',
                marks: [],
                text: 'This slice shows the path from schema to query to component. Duplicate its structure when you add your first real module.',
              },
            ],
          },
        ]}
        image={null}
        button={{
          text: 'Read the slice guide',
          variant: 'primary',
          linkType: 'url',
          url: 'https://www.sanity.io/docs',
          blank: true,
          internalReference: null,
        }}
        tone="default"
        padding_top="80"
        padding_bottom="80"
      />
    </main>
  )
}
