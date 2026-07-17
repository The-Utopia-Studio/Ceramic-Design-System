import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ChatSystemMessage } from '../packages/design-system/dist/Chat.mjs'
import { UtopiaWordmarkLoader } from '../packages/design-system/dist/UtopiaWordmarkLoader.mjs'

function renderChatSystemMessage(props, children) {
  return renderToStaticMarkup(React.createElement(ChatSystemMessage, props, children))
}

const combined = renderChatSystemMessage({ label: 'Today' }, 'Conversation resolved')

assert.match(
  combined,
  /class="uds-chat-system-message-content">.*class="uds-chat-system-message-label">Today<\/span>.*class="uds-chat-system-message-body">Conversation resolved<\/span>.*<\/span>/,
  'label + children must share one center wrapper between the separators',
)

const labelOnly = renderChatSystemMessage({ label: 'Today' })
assert.match(labelOnly, /class="uds-chat-system-message-content"><span class="uds-chat-system-message-label">Today<\/span><\/span>/)
assert.doesNotMatch(labelOnly, /uds-chat-system-message-body/)

const childrenOnly = renderChatSystemMessage({}, 'Conversation resolved')
assert.match(childrenOnly, /class="uds-chat-system-message-content"><span class="uds-chat-system-message-body">Conversation resolved<\/span><\/span>/)
assert.doesNotMatch(childrenOnly, /uds-chat-system-message-label/)

const brandedLoader = renderToStaticMarkup(React.createElement(UtopiaWordmarkLoader, {
  fullscreen: false,
  label: 'Loading workspace',
  phase: 'intro',
  size: 'sm',
}))
assert.match(brandedLoader, /role="status"/)
assert.match(brandedLoader, /aria-busy="true"/)
assert.match(brandedLoader, /data-fullscreen="false"/)
assert.match(brandedLoader, /data-size="sm"/)
assert.match(brandedLoader, />Loading workspace<\/span>/)
assert.match(brandedLoader, /viewBox="0 0 364\.9 236\.9"/)

console.log('Component contract tests passed')
