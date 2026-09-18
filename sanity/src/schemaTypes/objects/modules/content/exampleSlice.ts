import {defineField, defineType} from 'sanity'

import {ComposeIcon} from '../../../../components/icons/SanityIcons'
import {paddingFields} from '../../ui/paddingFields'

export const exampleSliceType = defineType({
  name: 'exampleSlice',
  title: 'Example Slice',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      initialValue: 'Example slice',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required().error('Heading is required'),
      initialValue: 'Start here and replace this with your own content.',
    }),
    defineField({
      name: 'content',
      type: 'portableText',
      title: 'Content',
    }),
    defineField({
      name: 'image',
      type: 'imageType',
      title: 'Image',
    }),
    defineField({
      name: 'button',
      type: 'button',
      title: 'Button',
    }),
    defineField({
      name: 'tone',
      type: 'string',
      title: 'Tone',
      options: {
        layout: 'radio',
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Muted', value: 'muted'},
        ],
      },
      initialValue: 'default',
    }),
    ...paddingFields,
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'eyebrow',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Example Slice',
        subtitle: subtitle || 'Page Builder Module: Example Slice',
        media: ComposeIcon,
      }
    },
  },
})
