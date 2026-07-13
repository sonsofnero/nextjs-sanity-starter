import {defineField, defineType} from 'sanity'

import {ImageIcon} from '../../../components/icons/SanityIcons'

export const imageType = defineType({
  name: 'imageType',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const parent = context.parent as {asset?: {_ref?: string}}
          if (parent?.asset?._ref && !alt) {
            return 'Alt text is recommended when an image is present'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
})
