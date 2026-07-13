import {defineField, defineType} from 'sanity'

import {ComposeIcon, HomeIcon, SearchIcon} from '../../components/icons/SanityIcons'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Content', icon: HomeIcon, default: true},
    {name: 'modules', title: 'Page Builder', icon: ComposeIcon},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      initialValue: 'Home',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modules',
      type: 'pageBuilder',
      group: 'modules',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
