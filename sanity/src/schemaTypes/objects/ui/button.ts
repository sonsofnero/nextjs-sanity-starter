import {defineField, defineType} from 'sanity'

import {INTERNAL_PAGE_REFERENCE_TYPES} from '../../utils/internalPageReferenceTypes'

export const buttonType = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'URL', value: 'url'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internalReference',
      title: 'Internal Reference',
      type: 'reference',
      to: INTERNAL_PAGE_REFERENCE_TYPES,
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'url',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
        ],
      },
    }),
  ],
})
