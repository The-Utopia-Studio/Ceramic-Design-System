# Personas / 페르소나

## 요약

Utopia Design System은 일반적인 product team만을 위한 시스템이 아니라 venture studio 환경을 위한 시스템이다. 사용자에는 founders, engineers, designers, AI agents, maintainers, Arabic/RTL reviewers, product operators가 포함된다.

각 persona는 시스템을 통해 모호성을 줄이고, 품질을 높이고, early product work를 더 재사용 가능하게 만들어야 한다.

## Founder Or Venture Co-Build Partner

Founder는 제품이 아직 존재하지 않는 단계에서 Utopia와 협업할 수 있다. 이들에게는 모든 interface decision을 처음부터 invent하지 않고 idea에서 credible first product로 이동하는 빠른 경로가 필요하다.

Needs:

- First build를 위한 빠른 product foundation.
- Landing page, app, form, dashboard, AI surface를 위한 credible template.
- Middle East, Southeast Asia, Africa context를 위한 market-ready pattern.
- 버려지는 prototype이 아니라 production으로 성숙할 수 있는 UI foundation.

Success means founder가 더 적은 재작업으로 더 빠르게 serious first product에 도달하는 것이다.

## Product Engineer

Product engineer는 실제 interface를 만든다. 안정적인 component, 명확한 import, 예측 가능한 styling, local decision을 줄이는 implementation rule이 필요하다.

Needs:

- Typed React component와 stable entrypoint.
- Consumer app에 설치 가능한 core CSS 및 theme CSS.
- Raw brand value 대신 semantic token.
- 필요한 경우 Radix/shadcn-founded primitive.
- Production use case에 가까운 example.

Success means engineer가 system contract 안에서 더 빠르게 build하는 것이다.

## Product Designer

Product designer는 design decision이 implementation behavior로 연결되는 공유 언어가 필요하다.

Needs:

- 이름이 정리된 component와 template.
- 명확한 token role.
- Core와 theme boundary.
- Utopia Default visual policy.
- Arabic-optimized layout 및 typography rule.
- AI-generated exploration을 위한 workflow constraint.

Success means design exploration이 production UI로 깔끔하게 번역되는 것이다.

## AI Coding Agent

AI agent는 UI를 생성하기 전에 구조화된 context가 필요하다. Screenshot이나 local page에서 Utopia rule을 추론하면 안 된다.

Needs:

- Dense CLI output.
- Machine-readable manifest.
- Component contract.
- Template skeleton.
- Theme policy.
- Arabic-optimized rule.
- Validation guidance.

Success means AI-generated UI가 local shortcut을 invent하지 않고 approved component, token, template, theme rule을 사용하는 것이다.

## AI-Enabled Designer Or Developer

AI-enabled designer와 developer는 여러 product direction을 병렬 생성할 수 있다. 이들은 그 방향들이 서로 비교하고 review할 수 있을 만큼 일관되게 유지되기를 원한다.

Needs:

- Agent-ready workflow.
- Clear review gate.
- Reusable template.
- AI가 invent하면 안 되는 것에 대한 rule.
- Generated UI에 대한 빠른 validation.

Success means AI가 exploration speed를 높이면서도 product quality를 낮추지 않는 것이다.

## Design System Maintainer

Maintainer는 시스템의 무결성을 보호한다.

Needs:

- New component, template, theme을 위한 governance.
- Component audit.
- Token 및 manifest check.
- Release discipline.
- Core, theme, consumer app에 각각 무엇이 속하는지에 대한 명확한 rule.

Success means 시스템이 커지면서도 inconsistent해지지 않는 것이다.

## Arabic, RTL, And Market Readiness Reviewer

Arabic 및 RTL reviewer는 시스템이 Arabic-speaking user를 baseline user로 다루는지 확인한다.

Needs:

- RTL layout rule.
- Arabic typography rule.
- Bidirectional text support.
- Date, number, currency, name, form, search, validation, error state를 위한 localization guidance.
- Arabic 및 RTL context의 accessibility check.

Success means Arabic support가 implementation 이후 patch가 아니라 시스템에 설계되어 있는 것이다.

## Product Lead Or Operator

Product lead는 venture 전반의 speed, quality, repeatability를 본다.

Needs:

- 명확한 adoption reason.
- Success metric.
- 신뢰할 수 있는 AI quality-control workflow.
- Market-readiness confidence.
- Prototype에서 production으로 가는 경로.

Success means Utopia가 반복 setup cost와 design drift를 줄이면서 더 많은 제품을 만들 수 있는 것이다.

