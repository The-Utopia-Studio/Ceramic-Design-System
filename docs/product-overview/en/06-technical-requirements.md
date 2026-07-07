# Technical Requirements

## Summary

The Utopia Design System must support a Qatar-based venture studio building products with founders across Middle East, Southeast Asia, and Africa contexts. It must be usable by humans and AI agents, and it must treat Arabic/RTL readiness as a baseline product requirement.

## TR-001: Standalone Source Of Truth

The design system must remain the reusable source of truth. Production websites and product apps must consume it rather than define reusable design logic locally.

Acceptance criteria:

- Reusable source lives under `packages/design-system`.
- Product and technical docs live under `docs/`.
- Manifests live under `packages/design-system/src/manifests`.
- Consumer-specific business logic stays in consumer apps.

## TR-002: Core And Theme Separation

Core must own shared behavior. Themes must own brand policy.

Acceptance criteria:

- Core components use semantic tokens.
- Reusable component logic does not hardcode Utopia Default brand primitives.
- Utopia Default rules live in the theme CSS and theme manifest.
- Future themes can map different primitives to the same semantic roles.

## TR-003: Semantic Token Contract

The system must expose stable semantic tokens.

Acceptance criteria:

- Components bind to semantic roles, not raw values.
- Required roles include background, foreground, card, primary, secondary, muted, border, input, ring, radius, fonts, Arabic font, line height, control size, and spacing roles.
- Theme CSS maps brand primitives to roles.
- Tokens support future theme extension.

## TR-004: Component Package

Components must be importable, typed, accessible, and predictable.

Acceptance criteria:

- Components expose stable entrypoints.
- APIs are React-compatible and typed.
- Radix/shadcn-founded primitives preserve accessible behavior.
- Components support realistic production examples.
- Components avoid brittle width, direction, and text-length assumptions.

## TR-005: AI-Friendly / Agent-Ready Contract

AI agents must be able to discover, query, implement, and validate the system without guessing.

Acceptance criteria:

- Maintain machine-readable manifests for catalog, components, templates, themes, and theme policy.
- Provide dense CLI output for agent workflows.
- Support machine-readable output formats for components, templates, themes, docs, tokens, and validation states.
- Define a required agent workflow: select template, inspect skeleton, read component contracts, read theme policy, read Arabic-optimized rules, implement, validate.
- Prepare for MCP-style access so agents can retrieve component and documentation records on demand.
- Include never-invent rules for raw colors, raw spacing, arbitrary components, left/right-only layout, unapproved Arabic copy, and page-specific shortcuts.

## TR-006: Arabic-Optimized Baseline

Arabic support must be designed into the baseline, not added as post-translation localization.

Acceptance criteria:

- Support `dir="ltr"` and `dir="rtl"`.
- Use logical CSS properties instead of left/right-only layout rules.
- Define RTL behavior for navigation, sidebars, menus, forms, button order, step flows, cards, tables, sliders, carousels, directional icons, and motion.
- Define Arabic typography tokens for font family, heading scale, body scale, weight, line height, diacritics, and dense connected letterforms.
- Support mixed Arabic/English bidirectional text in labels, inputs, tables, messages, and search.
- Document localization rules for dates, time, numbers, currency, addresses, names, phone numbers, calendars, pluralization, validation, errors, and empty states.
- Validate accessibility in Arabic and RTL contexts.

## TR-007: Venture Studio Reuse

The system must reduce the cost of starting new founder co-built products.

Acceptance criteria:

- Provide templates for first product surfaces.
- Support landing pages, product app shells, AI chat surfaces, dashboards, application flows, and forms.
- Make it possible to move from prototype to production without discarding the design foundation.
- Keep venture-specific business rules outside reusable core.

## TR-008: Validation And QA

The system must be verifiable through repeatable commands and review gates.

Acceptance criteria:

- `npm run build` passes.
- Component audits pass.
- Manifest coverage can be checked.
- Agent-generated UI can be reviewed against component, token, theme, Arabic, and accessibility rules.
- Generated build artifacts are not committed as source.

## TR-009: Documentation And Localization

Documentation must support humans, AI agents, English readers, and Korean readers.

Acceptance criteria:

- Product overview docs exist in English and Korean.
- Docs define AI-friendly / agent-ready and Arabic-optimized principles.
- Docs explain core/theme separation.
- Docs explain why Arabic readiness is product strategy, not translation polish.
- Docs include agent workflows and never-invent rules.

## TR-010: Release And Consumer Integration

The system must be ready for package adoption.

Acceptance criteria:

- Installation instructions are documented.
- Core CSS and theme CSS import paths are clear.
- Component import paths are clear.
- Versioning communicates breaking changes, new components, and theme policy changes.

