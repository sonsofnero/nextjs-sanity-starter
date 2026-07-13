import {defineField} from 'sanity'

const paddingOptions = [
  {title: 'None', value: 'none'},
  {title: '240', value: '240'},
  {title: '200', value: '200'},
  {title: '160', value: '160'},
  {title: '128', value: '128'},
  {title: '104', value: '104'},
  {title: '80', value: '80'},
  {title: '64', value: '64'},
  {title: '40', value: '40'},
]

export const paddingTopField = defineField({
  name: 'padding_top',
  type: 'string',
  title: 'Padding Top',
  description: 'Vertical spacing above this section',
  options: {
    list: paddingOptions,
    layout: 'dropdown',
  },
  initialValue: '80',
})

export const paddingBottomField = defineField({
  name: 'padding_bottom',
  type: 'string',
  title: 'Padding Bottom',
  description: 'Vertical spacing below this section',
  options: {
    list: paddingOptions,
    layout: 'dropdown',
  },
  initialValue: '80',
})

export const paddingFields = [paddingTopField, paddingBottomField]

