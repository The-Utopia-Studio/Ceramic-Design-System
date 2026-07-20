# Share a community template

Ceramic community templates stay in the creator's public GitHub repository. Ceramic reviews a pinned version before listing it in the catalog; submitting a repository does not execute its code on the documentation website.

## What the designer prepares

1. A public GitHub repository containing the runnable template source.
2. A working preview URL when possible.
3. A license covering the source and included assets.
4. A `ceramic.template.json` file at the repository root.
5. Responsive, dark-mode, keyboard, and RTL coverage.

Do not include credentials, `.env` files, private keys, production customer data, unlicensed media, or install lifecycle scripts.

## Manifest

Create `ceramic.template.json` in the repository root:

```json
{
  "$schema": "https://raw.githubusercontent.com/The-Utopia-Studio/Ceramic-Design-System/main/packages/design-system/src/manifests/community-template.schema.json",
  "schemaVersion": 1,
  "id": "operations-dashboard",
  "name": "Operations Dashboard",
  "version": "1.0.0",
  "summary": "A responsive operations dashboard for queues, incidents, and team handoffs.",
  "category": "dashboard",
  "author": {
    "name": "Example Studio",
    "url": "https://example.com"
  },
  "license": "MIT",
  "repository": "https://github.com/example/operations-dashboard",
  "preview": "https://operations-dashboard.example.com",
  "designSystem": {
    "package": "@utopia-studio-design/design-system",
    "version": "^0.4.4"
  },
  "entry": "src/main.tsx",
  "files": ["src", "index.html", "package.json"],
  "themes": ["utopia-default", "dextrum"],
  "features": {
    "responsive": true,
    "darkMode": true,
    "rtl": true
  }
}
```

## Validate

Install the public CLI and run validation from the template repository root:

```sh
npm install -D @utopia-studio-design/design-system-cli
npx utopia-ds template validate .
```

Warnings identify raw color values or physical left/right CSS. Explain intentional theme-owned media values in the review request. Validation errors must be fixed before submission.

## Submit

Either use the form in the Ceramic Templates page or run:

```sh
npx utopia-ds template submit .
```

The command returns a GitHub review URL populated from the manifest. Open it, verify the declaration, and submit the issue. Pin a release or commit for review instead of asking maintainers to review a moving branch.

## Review and publication

Ceramic maintainers verify:

- public component APIs and package imports;
- semantic-token usage and theme compatibility;
- responsive, dark-mode, keyboard, reduced-motion, and RTL behavior;
- licensing, demo-data labeling, and asset ownership;
- the absence of secrets and install lifecycle scripts.

Approved submissions receive a catalog record under **Community**. The creator continues to own the source and releases. A new published version requires a new review; an existing version is never overwritten.

## Instructions to send to a designer

> Put the runnable template in a public GitHub repository and deploy a preview if possible. Add `ceramic.template.json` at the repository root using the example above. Confirm that the template uses `@utopia-studio-design/design-system`, semantic tokens, logical CSS properties, responsive layouts, dark mode, keyboard interaction, and RTL. Remove `.env` files, credentials, private keys, install scripts, private customer data, and unlicensed assets. Run `npx utopia-ds template validate .`, fix every error, then run `npx utopia-ds template submit .` or use the Submit a template form on the Ceramic Templates page. Send the generated GitHub review request with a pinned release or commit.
