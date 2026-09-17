/** Seeding writes to a dataset, so the operator must name the project explicitly. */
export function assertSeedTarget(
  configuredProjectId: string | undefined,
  confirmedProjectId: string | undefined,
): string {
  if (!configuredProjectId) {
    throw new Error('Seed aborted: no project ID is configured for the Studio.')
  }
  if (!confirmedProjectId) {
    throw new Error(
      `Seed aborted: set SEED_CONFIRM_PROJECT_ID=${configuredProjectId} to confirm the target project.`,
    )
  }
  if (confirmedProjectId !== configuredProjectId) {
    throw new Error(
      `Seed aborted: SEED_CONFIRM_PROJECT_ID "${confirmedProjectId}" does not match the configured project "${configuredProjectId}".`,
    )
  }
  return configuredProjectId
}
