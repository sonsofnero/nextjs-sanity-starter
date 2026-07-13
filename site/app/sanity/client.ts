import { createClient } from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'

import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/api'
import {token} from './token'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  token, // Required if you have a private dataset
  stega: {
    studioUrl,
    // Set logger to 'console' for more verbose logging
    // logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})


// Image URL builder
const builder = createImageUrlBuilder(client)

// Export urlFor helper
export const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source)

export * from './token'
