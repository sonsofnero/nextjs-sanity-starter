import {describe, expect, it} from 'vitest'
import {stegaEncodeSourceMap} from '@sanity/client/stega'
import {getModulePadding} from '../../components/slices/padding'

describe('section spacing', () => {
  it('defaults missing and null values to 80', () => {
    expect(getModulePadding()).toEqual(getModulePadding('80', '80'))
    expect(getModulePadding(null, null)).toEqual(getModulePadding('80', '80'))
  })
  it('leaves explicit none and invalid values unpadded', () => {
    expect(getModulePadding('none', 'unexpected')).toEqual({
      paddingTop: '',
      paddingBottom: '',
    })
    expect(getModulePadding('toString', '__proto__')).toEqual({
      paddingTop: '',
      paddingBottom: '',
    })
  })
  it('uses encoded preview values just like plain values', () => {
    const encoded = stegaEncodeSourceMap(
      {spacing: '80'},
      {
        documents: [{_id: 'example', _type: 'page'}],
        paths: ["$['spacing']"],
        mappings: {
          "$['spacing']": {
            type: 'value',
            source: {type: 'documentValue', document: 0, path: 0},
          },
        },
      },
      {enabled: true, studioUrl: 'https://example.com', filter: () => true},
    ).spacing
    expect(getModulePadding(encoded, encoded)).toEqual(
      getModulePadding('80', '80'),
    )
  })
})
