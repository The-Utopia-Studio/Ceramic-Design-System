import { generatedKoreanCopy } from './korean-copy.generated'

const reviewedKoreanCopy: Record<string, string> = {
  'Design System': '디자인 시스템',
  'Docs': '문서',
  'Components': '컴포넌트',
  'Templates': '템플릿',
  'Themes': '테마',
  'Search': '검색',
  'Get started': '시작하기',
  'Overview': '개요',
  'Usage': '사용법',
  'Examples': '예제',
  'Best practices': '모범 사례',
  'Props': '속성',
  'Tokens': '토큰',
  'AI rules': 'AI 규칙',
}

const koreanCopy = { ...generatedKoreanCopy, ...reviewedKoreanCopy }
const englishCopy = new Map(Object.entries(koreanCopy))
const koreanToEnglish = new Map(Object.entries(koreanCopy).map(([english, korean]) => [korean, english]))

export function translateKoreanText(value: string, toKorean = true) {
  const match = value.match(/^(\s*)([\s\S]*?)(\s*)$/)
  if (!match) return value
  const [, before, content, after] = match
  const translated = (toKorean ? englishCopy : koreanToEnglish).get(content)
  return translated ? `${before}${translated}${after}` : value
}
