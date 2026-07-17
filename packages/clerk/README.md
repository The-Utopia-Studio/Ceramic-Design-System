# `@utopia-studio-design/clerk`

Optional Clerk integration wrappers for Utopia Studio products. Clerk remains
responsible for authentication, sessions, organizations, keyboard behavior, and
security UI. This package owns only semantic-token styling and thin wrappers.

## Install

```sh
npm install @utopia-studio-design/clerk @clerk/nextjs
```

Import the design-system core and theme before the integration stylesheet:

```ts
import '@utopia-studio-design/design-system/core.css'
import '@utopia-studio-design/design-system/themes/dextrum.css'
import '@utopia-studio-design/clerk/dextrum.css'
```

## Usage

```tsx
import {
  DextrumOrganizationSwitcher,
  DextrumUserButton,
} from '@utopia-studio-design/clerk'

<DextrumOrganizationSwitcher
  hidePersonal
  afterSelectOrganizationUrl="/dashboard"
  afterLeaveOrganizationUrl="/dashboard"
/>

<DextrumUserButton showName />
```

Product-specific Clerk appearance options can still be supplied. String class
names are composed with the adapter hooks, while object-style element overrides
take precedence.

Apps that only need the adapter constants can import the runtime-independent
`@utopia-studio-design/clerk/appearance` subpath without loading Clerk's React
components.

Clerk development-instance labels such as “Development mode” and “Secured by
Clerk” are intentionally not hidden or altered by this package.
