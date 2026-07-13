import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .schemaType('homePage')
        .child(S.editor().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
    ])
