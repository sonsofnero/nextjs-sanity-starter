import {createDataAttribute, type CreateDataAttributeProps} from 'next-sanity'
import {dataset, projectId, studioUrl} from '@/sanity/api'

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({projectId, dataset, baseUrl: studioUrl}).combine(
    config,
  )
}
