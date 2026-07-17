import type { UserButton } from '@clerk/nextjs'
import type { ComponentProps } from 'react'

export type ClerkAppearance = NonNullable<ComponentProps<typeof UserButton>['appearance']>

const dextrumPopoverElements = {
  organizationSwitcherPopoverRootBox: 'dextrum-clerk-popover-root',
  organizationSwitcherPopoverCard: 'dextrum-clerk-popover-card',
  organizationSwitcherPopoverMain: 'dextrum-clerk-popover-main',
  organizationSwitcherPopoverActions: 'dextrum-clerk-popover-actions',
  organizationSwitcherPopoverActionButton: 'dextrum-clerk-popover-action',
  organizationSwitcherPopoverFooter: 'dextrum-clerk-popover-footer',
  userButtonPopoverRootBox: 'dextrum-clerk-popover-root',
  userButtonPopoverCard: 'dextrum-clerk-popover-card',
  userButtonPopoverMain: 'dextrum-clerk-popover-main',
  userButtonPopoverActions: 'dextrum-clerk-popover-actions',
  userButtonPopoverActionButton: 'dextrum-clerk-popover-action',
  userButtonPopoverActionButtonIconBox: 'dextrum-clerk-popover-action-icon',
  userButtonPopoverFooter: 'dextrum-clerk-popover-footer',
} as const

export const dextrumClerkAppearance = {
  elements: dextrumPopoverElements,
} as const satisfies ClerkAppearance

export const dextrumOrganizationSwitcherAppearance = {
  elements: {
    ...dextrumPopoverElements,
    rootBox: 'dextrum-clerk-org-root',
    organizationSwitcherTrigger: 'dextrum-clerk-org-trigger',
    organizationPreview: 'dextrum-clerk-org-preview',
    organizationPreviewTextContainer: 'dextrum-clerk-org-preview-copy',
    organizationPreviewMainIdentifier: 'dextrum-clerk-org-name',
    organizationSwitcherTriggerIcon: 'dextrum-clerk-org-trigger-icon',
  },
} as const satisfies ClerkAppearance

export const dextrumUserButtonAppearance = {
  elements: {
    ...dextrumPopoverElements,
    userButtonBox: 'dextrum-clerk-user-box',
    userButtonTrigger: 'dextrum-clerk-user-trigger',
    userButtonAvatarBox: 'dextrum-clerk-user-avatar',
  },
} as const satisfies ClerkAppearance

function mergeElementStyles(base: unknown, override: unknown) {
  if (typeof base === 'string' && typeof override === 'string') {
    return `${base} ${override}`
  }

  return override ?? base
}

/**
 * Merges a product override without discarding the adapter's class hooks.
 * String class names are composed; object-style element overrides take precedence.
 */
export function mergeClerkAppearance(
  base: ClerkAppearance,
  override?: ClerkAppearance,
): ClerkAppearance {
  if (!override) return base

  const baseElements = (base.elements ?? {}) as Record<string, unknown>
  const overrideElements = (override.elements ?? {}) as Record<string, unknown>
  const elementKeys = new Set([...Object.keys(baseElements), ...Object.keys(overrideElements)])
  const elements = Object.fromEntries(
    [...elementKeys].map((key) => [
      key,
      mergeElementStyles(baseElements[key], overrideElements[key]),
    ]),
  )

  return {
    ...base,
    ...override,
    elements,
  } as ClerkAppearance
}
