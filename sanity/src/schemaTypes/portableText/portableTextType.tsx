import {defineArrayMember, defineType} from 'sanity'

export const portableTextType = defineType({
  name: 'portableText',
  title: 'Portable Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Large', value: 'large'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {name: 'href', title: 'URL', type: 'url'},
              {name: 'blank', title: 'Open in new tab', type: 'boolean'},
            ],
          }),
        ],
      },
    }),
    defineArrayMember({type: 'imageType'}),
  ],
})
