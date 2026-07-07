# Success Metrics / 성공 지표

## 요약

성공은 Utopia Design System이 Utopia가 제품을 더 빠르게 만들고, drift를 줄이고, AI quality control을 강화하고, Arabic 및 Middle East readiness를 높이는지로 측정해야 한다.

실제 제품 작업이 이 시스템에서 시작되고, AI-generated work가 review 및 shipping 가능한 일관성을 유지할 때 성공했다고 볼 수 있다.

## North Star Metric

**새로운 Utopia product interface 중 approved design-system template, component, semantic token, theme contract, agent-ready documentation에서 시작한 비율.**

Founder co-built product에서는 다음처럼 확장할 수 있다.

**새 founder product surface 중 blank UI implementation이 아니라 design-system foundation에서 시작한 비율.**

## Adoption Metrics

- Design-system package를 사용하는 consumer product 수.
- Approved template에서 시작한 founder co-built product 수.
- Approved component를 사용하는 새로운 UI work 비율.
- Core CSS와 explicit theme CSS를 import하는 product surface 비율.
- Implementation 전에 CLI/manifest를 사용하는 team 또는 agent 수.
- Real 또는 near-production work에서 사용된 template 수.

## AI-Friendly / Agent-Ready Metrics

- Required workflow를 따른 AI-generated UI 비율: template selection, skeleton inspection, component contract review, theme policy review, Arabic/RTL check, implementation.
- Approved import와 semantic token을 사용한 AI-generated UI 비율.
- Raw color, raw spacing, arbitrary component structure, unapproved Arabic copy를 피한 generated output 수.
- Human review 전에 발견된 validation failure 수.
- AI-assisted generation 이후 human cleanup time 감소.
- 같은 system contract를 사용해 비교 가능한 상태로 유지된 parallel AI-generated direction 수.
- Component, template, theme, token, docs, validation state에 대한 CLI 및 manifest coverage.

## Arabic-Optimized Metrics

- RTL behavior가 문서화된 reusable component 비율.
- Directional pattern의 RTL rule coverage: arrow, stepper, slider, carousel, menu, sidebar, motion.
- Arabic typography token coverage: font family, line height, heading scale, body rhythm, density, diacritics support.
- Arabic label, long text, mixed Arabic/English content로 테스트된 template 수.
- Date, time, number, currency, address, name, phone number, calendar, search, validation, error, empty state에 대한 localization rule coverage.
- Arabic 및 RTL context에서의 accessibility review pass rate.

## Quality Metrics

- `npm run build` pass rate.
- Component audit pass rate.
- `components.json`에 표현된 catalog component 비율.
- Realistic example을 가진 component 수.
- Reusable core code에서 발견된 hardcoded brand primitive 수.
- Reusable code에서 발견된 left/right-only layout assumption 수.
- Production 전에 발견된 accessibility issue 수.

## Venture Studio Metrics

- Founder brief에서 credible first product surface까지 걸리는 시간.
- Approved template를 사용하는 first product build 비율.
- Prototype에서 production으로 유지된 reusable product logic의 양.
- System default를 사용해 피한 one-off UI decision 수.
- 같은 core contract로 Middle East, Southeast Asia, Africa context에 ship된 product surface 수.

## Initial Targets

- AI-friendly / agent-ready와 Arabic-optimized를 공식 product principle로 정의한다.
- 모든 reusable component logic을 semantic role에 묶는다.
- 관련 component category마다 RTL 및 Arabic-optimized expectation을 문서화한다.
- Build와 component audit command를 통과 상태로 유지한다.
- 하나 이상의 founder co-built product template path를 명시한다.
- AI agent가 추측 없이 따를 수 있는 agent workflow를 하나 이상 명시한다.

