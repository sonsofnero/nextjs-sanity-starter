import {getCliClient} from 'sanity/cli'

import {seedDocuments} from './seedDocuments'
import {assertSeedTarget} from './seedGuard'

const client = getCliClient({apiVersion: '2025-12-18'})

async function seed() {
  const {projectId, dataset} = client.config()
  assertSeedTarget(projectId, process.env.SEED_CONFIRM_PROJECT_ID)

  for (const document of seedDocuments) {
    const existing = await client.getDocument(document._id)
    await client.createIfNotExists(document)
    const created = !existing
    console.log(`${created ? 'created' : 'exists '}  ${document._type}  ${document._id}`)
  }
  console.log(`Seed finished for ${projectId}/${dataset}. Existing documents were left untouched.`)
}

seed().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
