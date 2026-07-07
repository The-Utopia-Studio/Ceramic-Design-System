# Product Description / 제품 설명

## 제품명

Utopia Design System

## 제품 정의

Utopia Design System은 The Utopia Studio를 위한 reusable interface infrastructure다. Utopia 제품을 만들 때 사용하는 component, token, theme, template, documentation, CLI workflow, machine-readable contract를 정의한다.

이 시스템은 founders와 처음부터 제품을 같이 만들 수 있는 카타르 기반 venture studio를 위해 설계된다. 새로운 venture마다 interface architecture를 처음부터 다시 시작하지 않게 하고, human-led work와 AI-assisted work 모두에서 높은 품질을 유지하게 한다.

이 시스템은 두 가지 product principle을 중심으로 만들어진다: **AI-Friendly / Agent-Ready**와 **Arabic-Optimized**.

## AI-Friendly / Agent-Ready

AI-friendly는 AI agent가 사용할 수 있는 operational interface라는 뜻이다. 사람이 읽는 문서를 AI가 볼 수 있다는 정도가 아니다.

Agent-ready design system은 agent가 다음을 할 수 있어야 한다.

- 사용 가능한 component, template, token, theme, docs를 발견한다.
- 코드를 쓰기 전에 정확한 component contract를 조회한다.
- page를 생성하기 전에 template skeleton을 확인한다.
- color, typography, spacing, shape, icon을 선택하기 전에 theme policy를 읽는다.
- layout을 구현하기 전에 Arabic-optimized 및 RTL rule을 확인한다.
- system rule에 따라 검증 가능한 UI를 생성한다.

참고 방향은 Astryx-style agent readiness다. Structured docs, dense CLI output, typed machine-readable response, template, token, component contract, future MCP-style access가 핵심이다. Utopia는 이 아이디어를 디자이너와 개발자가 AI로 여러 product direction을 병렬 생성하는 workflow에 맞게 적용해야 한다.

목표는 단순히 더 빠른 생성이 아니다. 목표는 통제 가능한 생성이다. AI output은 비교 가능하고, review 가능하고, production으로 이어질 수 있어야 한다.

## Arabic-Optimized

Arabic-optimized는 Arabic-speaking user를 baseline product user로 본다는 뜻이다. English UI를 Arabic으로 번역한 버전이 아니다.

Utopia에서 Arabic-optimized는 다음을 포함한다.

- RTL page flow와 layout behavior.
- Navigation, sidebar, menu, button order, step flow, carousel, slider, table, directional icon rule.
- Font family, size, weight, line height, heading scale, body rhythm, dense connected letterform을 위한 Arabic typography token.
- Bidirectional English/Arabic text 처리.
- Date, time, number, currency, address, name, phone number, calendar, search, validation, error state, empty state에 대한 localization rule.
- Arabic-region usage를 고려한 form과 input.
- Arabic 및 RTL context에서의 accessibility check.

Utopia가 Qatar에 기반을 두고 Middle East market을 핵심 product context로 보기 때문에 이것은 필수다.

## Core And Theme Model

Core가 소유하는 것:

- Component architecture.
- Semantic token role.
- Accessibility behavior.
- Arabic-optimized baseline behavior.
- AI-readable contract.
- Theme extension mechanism.

Theme이 소유하는 것:

- Brand color mapping.
- Typography choice.
- Icon policy.
- Shape and radius.
- Elevation model.
- Visual tone.
- Brand-specific layout philosophy.

Utopia Default는 첫 locked reference theme이다. 전체 디자인 시스템 자체가 아니다. Future theme은 같은 core contract 안에 다른 brand primitive를 매핑할 수 있어야 한다.

## 대상 사용 사례

시스템은 다음을 지원해야 한다.

- Founder co-built first product.
- Utopia Studio public website.
- Product 및 SaaS application shell.
- AI chat product surface.
- Dashboard 및 internal operator tool.
- Application 및 onboarding flow.
- Venture proof 및 portfolio page.
- Arabic/RTL-ready Middle East product.
- Southeast Asia 및 Africa를 위한 multilingual product.
- AI-assisted parallel design and development workflow.

## 제품 방향

Utopia Design System은 Utopia가 product interface를 만드는 operating layer가 되어야 한다. 사람과 agent가 같은 contract에서 시작하고, 같은 component를 사용하고, 같은 theme boundary를 따르며, 같은 Arabic-optimized 및 accessibility expectation으로 검증할 수 있어야 한다.

