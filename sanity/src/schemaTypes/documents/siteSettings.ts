import {defineField, defineType} from 'sanity'

import {CogIcon} from '../../components/icons/SanityIcons'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'Used in browser titles ("Page | Site name") and share cards.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Default description',
      type: 'text',
      rows: 2,
      description: 'Used when a page has no SEO description.',
      validation: (Rule) =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'image',
      title: 'Default share image',
      type: 'image',
      description: 'Used when a page has no SEO image.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide the entire site from search engines',
      type: 'boolean',
      description: 'Keep this on until launch.',
      initialValue: false,
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
