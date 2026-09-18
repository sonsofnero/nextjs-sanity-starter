import {defineArrayMember, defineType} from 'sanity'

/** Slice types with a screenshot at sanity/static/<type>.png. */
const SLICE_PREVIEWS = new Set(['exampleSlice'])

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'exampleSlice'}),
    defineArrayMember({type: 'videoSlice'}),
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            SLICE_PREVIEWS.has(schemaTypeName)
              ? `/static/${schemaTypeName}.png`
              : undefined,
        },
        {name: 'list'},
      ],
    },
  },
})
