import {defineArrayMember, defineType} from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'exampleSlice'}),
  ],
  options: {
    insertMenu: {
      views: [{name: 'grid', previewImageUrl: (schemaTypeName) => `/static/${schemaTypeName}.png`}],
    },
  },
})
