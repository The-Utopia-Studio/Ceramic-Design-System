'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import type { ComponentProps } from 'react'
import {
  dextrumOrganizationSwitcherAppearance,
  dextrumUserButtonAppearance,
  mergeClerkAppearance,
} from './appearance'

export type DextrumOrganizationSwitcherProps = ComponentProps<typeof OrganizationSwitcher>
export type DextrumUserButtonProps = ComponentProps<typeof UserButton>

export function DextrumOrganizationSwitcher({
  appearance,
  ...props
}: DextrumOrganizationSwitcherProps) {
  return (
    <OrganizationSwitcher
      {...props}
      appearance={mergeClerkAppearance(dextrumOrganizationSwitcherAppearance, appearance)}
    />
  )
}

export function DextrumUserButton({ appearance, ...props }: DextrumUserButtonProps) {
  return (
    <UserButton
      {...props}
      appearance={mergeClerkAppearance(dextrumUserButtonAppearance, appearance)}
    />
  )
}
