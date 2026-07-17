import assert from 'node:assert/strict'
import {
  dextrumOrganizationSwitcherAppearance,
  dextrumUserButtonAppearance,
  mergeClerkAppearance,
} from '../packages/clerk/dist/appearance.mjs'

const merged = mergeClerkAppearance(dextrumUserButtonAppearance, {
  elements: {
    userButtonTrigger: 'product-override',
    userButtonAvatarBox: { borderRadius: '50%' },
  },
  variables: {
    colorPrimary: 'rebeccapurple',
  },
})

assert.equal(
  merged.elements.userButtonTrigger,
  'dextrum-clerk-user-trigger product-override',
  'string class hooks should compose',
)
assert.deepEqual(
  merged.elements.userButtonAvatarBox,
  { borderRadius: '50%' },
  'object element overrides should take precedence',
)
assert.equal(merged.variables.colorPrimary, 'rebeccapurple')
assert.equal(
  dextrumOrganizationSwitcherAppearance.elements.organizationSwitcherTrigger,
  'dextrum-clerk-org-trigger',
)

console.log('Clerk integration contract passed')
