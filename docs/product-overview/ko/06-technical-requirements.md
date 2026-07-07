# Technical Requirements / 기술 요구사항

## 요약

Utopia Design System은 founders와 제품을 같이 만드는 카타르 기반 venture studio를 지원해야 한다. 또한 Middle East, Southeast Asia, Africa context의 제품을 만들 수 있어야 한다. 시스템은 사람과 AI agent 모두가 사용할 수 있어야 하며, Arabic/RTL readiness를 baseline product requirement로 다뤄야 한다.

## TR-001: Standalone Source Of Truth

디자인 시스템은 reusable source of truth로 유지되어야 한다. Production website와 product app은 reusable design logic을 local로 정의하지 않고 이 시스템을 소비해야 한다.

Acceptance criteria:

- Reusable source는 `packages/design-system` 아래에 둔다.
- Product 및 technical docs는 `docs/` 아래에 둔다.
- Manifest는 `packages/design-system/src/manifests` 아래에 둔다.
- Consumer-specific business logic은 consumer app에 둔다.

## TR-002: Core And Theme Separation

Core는 shared behavior를 소유하고, theme은 brand policy를 소유해야 한다.

Acceptance criteria:

- Core component는 semantic token을 사용한다.
- Reusable component logic은 Utopia Default brand primitive를 하드코딩하지 않는다.
- Utopia Default rule은 theme CSS와 theme manifest에 둔다.
- Future theme은 다른 primitive를 같은 semantic role에 매핑할 수 있다.

## TR-003: Semantic Token Contract

시스템은 stable semantic token을 노출해야 한다.

Acceptance criteria:

- Component는 raw value가 아니라 semantic role에 바인딩된다.
- Required role에는 background, foreground, card, primary, secondary, muted, border, input, ring, radius, fonts, Arabic font, line height, control size, spacing role이 포함된다.
- Theme CSS는 brand primitive를 role에 매핑한다.
- Token은 future theme extension을 지원한다.

## TR-004: Component Package

Component는 import 가능하고, typed이고, accessible하며, 예측 가능해야 한다.

Acceptance criteria:

- Component는 stable entrypoint를 노출한다.
- API는 React-compatible 및 typed 상태여야 한다.
- Radix/shadcn-founded primitive는 accessible behavior를 보존한다.
- Component는 realistic production example을 지원한다.
- Component는 brittle width, direction, text-length assumption을 피한다.

## TR-005: AI-Friendly / Agent-Ready Contract

AI agent는 추측 없이 시스템을 발견하고, 조회하고, 구현하고, 검증할 수 있어야 한다.

Acceptance criteria:

- Catalog, component, template, theme, theme policy를 위한 machine-readable manifest를 유지한다.
- Agent workflow를 위한 dense CLI output을 제공한다.
- Component, template, theme, docs, token, validation state에 대한 machine-readable output format을 지원한다.
- Required agent workflow를 정의한다: template 선택, skeleton 확인, component contract 읽기, theme policy 읽기, Arabic-optimized rule 읽기, 구현, validation.
- Agent가 component와 documentation record를 필요할 때 가져올 수 있도록 MCP-style access를 준비한다.
- Raw color, raw spacing, arbitrary component, left/right-only layout, unapproved Arabic copy, page-specific shortcut에 대한 never-invent rule을 포함한다.

## TR-006: Arabic-Optimized Baseline

Arabic support는 post-translation localization으로 추가되는 것이 아니라 baseline에 설계되어야 한다.

Acceptance criteria:

- `dir="ltr"`와 `dir="rtl"`을 지원한다.
- Left/right-only layout rule 대신 logical CSS property를 사용한다.
- Navigation, sidebar, menu, form, button order, step flow, card, table, slider, carousel, directional icon, motion에 대한 RTL behavior를 정의한다.
- Font family, heading scale, body scale, weight, line height, diacritics, dense connected letterform을 위한 Arabic typography token을 정의한다.
- Label, input, table, message, search에서 mixed Arabic/English bidirectional text를 지원한다.
- Date, time, number, currency, address, name, phone number, calendar, pluralization, validation, error, empty state에 대한 localization rule을 문서화한다.
- Arabic 및 RTL context에서 accessibility를 검증한다.

## TR-007: Venture Studio Reuse

시스템은 새로운 founder co-built product를 시작하는 비용을 줄여야 한다.

Acceptance criteria:

- First product surface를 위한 template을 제공한다.
- Landing page, product app shell, AI chat surface, dashboard, application flow, form을 지원한다.
- Prototype에서 production으로 갈 때 design foundation을 버리지 않아도 되게 한다.
- Venture-specific business rule은 reusable core 밖에 둔다.

## TR-008: Validation And QA

시스템은 반복 가능한 command와 review gate로 검증 가능해야 한다.

Acceptance criteria:

- `npm run build`가 통과한다.
- Component audit이 통과한다.
- Manifest coverage를 확인할 수 있다.
- Agent-generated UI는 component, token, theme, Arabic, accessibility rule 기준으로 review 가능하다.
- Generated build artifact는 source로 commit하지 않는다.

## TR-009: Documentation And Localization

Documentation은 human, AI agent, English reader, Korean reader 모두를 지원해야 한다.

Acceptance criteria:

- Product overview docs는 English와 Korean으로 존재한다.
- Docs는 AI-friendly / agent-ready 및 Arabic-optimized principle을 정의한다.
- Docs는 core/theme separation을 설명한다.
- Docs는 Arabic readiness가 translation polish가 아니라 product strategy인 이유를 설명한다.
- Docs는 agent workflow와 never-invent rule을 포함한다.

## TR-010: Release And Consumer Integration

시스템은 package adoption을 준비해야 한다.

Acceptance criteria:

- Installation instruction이 문서화된다.
- Core CSS와 theme CSS import path가 명확하다.
- Component import path가 명확하다.
- Versioning은 breaking change, new component, theme policy change를 전달한다.

