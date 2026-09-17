import {defineField, defineType} from 'sanity'

import {PlayIcon} from '../../../../components/icons/SanityIcons'
import {paddingFields} from '../../ui/paddingFields'

export const videoSliceType = defineType({
  name: 'videoSlice',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Names the video for screen readers and Mux analytics.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      type: 'mux.video',
      title: 'Video',
      validation: (Rule) => Rule.required(),
    }),
    ...paddingFields,
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: title || 'Video',
      subtitle: 'Page Builder Module: Video',
      media: PlayIcon,
    }),
  },
})
