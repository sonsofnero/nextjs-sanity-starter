import {expect, it} from 'vitest'

import {assertSeedTarget} from '../../../sanity/scripts/seedGuard'

it('returns the project id only when the confirmation matches exactly', () => {
  expect(assertSeedTarget('abc123', 'abc123')).toBe('abc123')
})

it('refuses missing or mismatched confirmation', () => {
  expect(() => assertSeedTarget('abc123', undefined)).toThrow(/SEED_CONFIRM_PROJECT_ID/)
  expect(() => assertSeedTarget('abc123', 'other')).toThrow(/does not match/)
  expect(() => assertSeedTarget('abc123', ' abc123')).toThrow(/does not match/)
  expect(() => assertSeedTarget(undefined, 'abc123')).toThrow(/no project/i)
  expect(() => assertSeedTarget('', '')).toThrow(/no project/i)
})
