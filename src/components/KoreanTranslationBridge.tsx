import { useEffect } from 'react'
import { translateKoreanText } from '../korean-copy'

const SKIP_TAGS = new Set(['CODE', 'KBD', 'PRE', 'SCRIPT', 'STYLE', 'SVG'])
const TRANSLATED_ATTRIBUTES = ['aria-label', 'placeholder', 'title'] as const

function shouldSkip(node: Node) {
  const parent = node instanceof Element ? node : node.parentElement
  return Boolean(parent?.closest(Array.from(SKIP_TAGS).join(',')))
}

function translateNode(node: Node, toKorean: boolean) {
  if (shouldSkip(node)) return
  if (node.nodeType === Node.TEXT_NODE && node.textContent) {
    node.textContent = translateKoreanText(node.textContent, toKorean)
    return
  }
  if (!(node instanceof Element)) return
  TRANSLATED_ATTRIBUTES.forEach((attribute) => {
    const value = node.getAttribute(attribute)
    if (value) node.setAttribute(attribute, translateKoreanText(value, toKorean))
  })
  node.childNodes.forEach((child) => translateNode(child, toKorean))
}

export function KoreanTranslationBridge({ active }: { active: boolean }) {
  useEffect(() => {
    const root = document.querySelector('.app-shell')
    if (!root) return
    translateNode(root, active)
    if (!active) return

    const observer = new MutationObserver((mutations) => {
      observer.disconnect()
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => translateNode(node, true))
        if (mutation.type === 'characterData') translateNode(mutation.target, true)
        if (mutation.type === 'attributes') translateNode(mutation.target, true)
      })
      observer.observe(root, { attributes: true, characterData: true, childList: true, subtree: true })
    })
    observer.observe(root, { attributes: true, characterData: true, childList: true, subtree: true })
    return () => observer.disconnect()
  }, [active])

  return null
}
