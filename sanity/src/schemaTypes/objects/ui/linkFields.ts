import {defineField} from 'sanity'

import {INTERNAL_PAGE_REFERENCE_TYPES} from '../../utils/internalPageReferenceTypes'

type LinkParent = {linkType?: string}

export const linkFields = [
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
    validation: (Rule) =>
      Rule.custom((value, context) =>
        (context.parent as LinkParent)?.linkType === 'internal' && !value
          ? 'Choose a page'
          : true,
      ),
  }),
  defineField({
    name: 'url',
    title: 'URL',
    type: 'url',
    hidden: ({parent}) => parent?.linkType !== 'url',
    validation: (Rule) =>
      Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}).custom(
        (value, context) =>
          (context.parent as LinkParent)?.linkType === 'url' && !value
            ? 'Enter a URL'
            : true,
      ),
  }),
  defineField({
    name: 'blank',
    title: 'Open in new tab',
    type: 'boolean',
    initialValue: false,
  }),
]
