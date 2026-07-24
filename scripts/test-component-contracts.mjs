import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ChatSystemMessage } from '../packages/design-system/dist/Chat.mjs'
import { UtopiaWordmarkLoader } from '../packages/design-system/dist/UtopiaWordmarkLoader.mjs'

process.env.NODE_ENV = 'development'
const {
  NativeSelect,
  NativeSelectOption,
  Select,
  SelectTrigger,
  SelectValue,
  Selector,
} = await import('../packages/design-system/dist/Forms.mjs')
const rootExports = await import('../packages/design-system/dist/index.mjs')
const shadcnExports = await import('../packages/design-system/dist/ShadcnPrimitives.mjs')
const navigationExports = await import('../packages/design-system/dist/Navigation.mjs')
const sidebarExports = await import('../packages/design-system/dist/Sidebar.mjs')
const assistantPanelExports = await import('../packages/design-system/dist/AssistantPanel.mjs')
const toolConnectorExports = await import('../packages/design-system/dist/ToolConnector.mjs')

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

const assistantPanel = renderToStaticMarkup(React.createElement(
  assistantPanelExports.AssistantPanel,
  {
    'aria-label': 'Co-pilot',
    header: React.createElement(
      assistantPanelExports.AssistantPanelHeader,
      null,
      React.createElement(
        assistantPanelExports.AssistantPanelHeading,
        null,
        React.createElement(assistantPanelExports.AssistantPanelTitle, null, 'Co-pilot'),
        React.createElement(
          assistantPanelExports.AssistantPanelDescription,
          null,
          'Workspace context',
        ),
      ),
      React.createElement(
        assistantPanelExports.AssistantPanelActions,
        null,
        React.createElement(assistantPanelExports.AssistantPanelClose, {
          label: 'Close Co-pilot',
        }),
      ),
    ),
    body: React.createElement(
      assistantPanelExports.AssistantPanelBody,
      null,
      React.createElement(assistantPanelExports.AssistantPanelEmptyState, {
        title: 'How can I help?',
        description: 'Ask about this workspace.',
      }),
    ),
    footer: React.createElement(
      assistantPanelExports.AssistantPanelFooter,
      null,
      'Composer',
    ),
  },
))
assert.match(assistantPanel, /class="uds-assistant-panel"/)
assert.match(assistantPanel, /class="uds-assistant-panel-header"/)
assert.match(assistantPanel, /class="uds-assistant-panel-body"/)
assert.match(assistantPanel, /class="uds-assistant-panel-footer"/)
assert.match(assistantPanel, /aria-label="Close Co-pilot"/)
assert.match(assistantPanel, /class="lucide lucide-x"/)
assert.doesNotMatch(assistantPanel, /role="dialog"/)

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

const nativeSelect = renderToStaticMarkup(React.createElement(
  NativeSelect,
  { 'aria-label': 'Disposition', defaultValue: 'open' },
  React.createElement(NativeSelectOption, { value: 'open' }, 'Open'),
))
assert.match(nativeSelect, /class="uds-native-select"/)
assert.match(nativeSelect, /class="uds-native-select-control"/)
assert.match(nativeSelect, /<option value="open" selected="">Open<\/option>/)
assert.equal(rootExports.NativeSelect, NativeSelect, 'root NativeSelect export must use the canonical Forms implementation')
assert.equal(shadcnExports.NativeSelect, NativeSelect, 'legacy ShadcnPrimitives path must remain a compatible re-export')

const deprecationWarnings = []
const originalWarn = console.warn
console.warn = (message) => deprecationWarnings.push(String(message))
try {
  renderToStaticMarkup(React.createElement(Selector, { 'aria-label': 'Legacy selector' }))
  renderToStaticMarkup(React.createElement(Selector, { 'aria-label': 'Legacy selector again' }))
} finally {
  console.warn = originalWarn
}
assert.equal(deprecationWarnings.length, 1, 'Selector deprecation warning must appear only once in development')
assert.match(deprecationWarnings[0], /Selector is deprecated/)
assert.match(deprecationWarnings[0], /NativeSelect/)
assert.match(deprecationWarnings[0], /SelectTrigger, SelectContent, and SelectItem/)

const themeableSelect = renderToStaticMarkup(React.createElement(
  Select,
  { defaultValue: 'default' },
  React.createElement(
    SelectTrigger,
    { 'aria-label': 'Theme' },
    React.createElement(SelectValue, null),
  ),
))
assert.match(themeableSelect, /<svg[^>]*class="lucide lucide-chevron-down uds-select-trigger-icon"/)
assert.match(themeableSelect, /aria-hidden="true"/)
assert.doesNotMatch(themeableSelect, />⌄</)

const inverseBreadcrumb = renderToStaticMarkup(React.createElement(
  navigationExports.Breadcrumb,
  { 'aria-label': 'Current location', variant: 'inverse' },
  React.createElement(
    navigationExports.BreadcrumbList,
    null,
    React.createElement(navigationExports.BreadcrumbItem, null,
      React.createElement(navigationExports.BreadcrumbLink, { href: '/' }, 'Home')),
    React.createElement(navigationExports.BreadcrumbSeparator),
    React.createElement(navigationExports.BreadcrumbItem, null,
      React.createElement(navigationExports.BreadcrumbPage, null, 'Projects')),
  ),
))
assert.match(inverseBreadcrumb, /class="uds-breadcrumb" data-variant="inverse"/)
assert.match(inverseBreadcrumb, /aria-current="page"/)
assert.match(inverseBreadcrumb, /class="lucide lucide-chevron-right uds-breadcrumb-separator-icon"/)
assert.match(inverseBreadcrumb, /aria-hidden="true"/)
assert.doesNotMatch(inverseBreadcrumb, />\/</, 'BreadcrumbSeparator must not render the legacy slash')
assert.doesNotMatch(inverseBreadcrumb, /lucide-house/, 'Breadcrumb must not add a home icon')

const activeSidebarItem = renderToStaticMarkup(React.createElement(
  sidebarExports.SidebarMenuButton,
  { activeVariant: 'both', isActive: true, tooltip: 'Projects' },
  React.createElement(navigationExports.NavigationIcon, { name: 'projects' }),
  React.createElement('span', null, 'Projects'),
))
assert.match(activeSidebarItem, /aria-current="page"/)
assert.match(activeSidebarItem, /aria-label="Projects"/)
assert.match(activeSidebarItem, /data-active=""/)
assert.match(activeSidebarItem, /data-active-variant="both"/)
assert.match(activeSidebarItem, /class="lucide lucide-folder-kanban uds-navigation-icon"/)
assert.match(activeSidebarItem, /aria-hidden="true"/)

assert.equal(
  typeof sidebarExports.SidebarBlockType1,
  'function',
  'SidebarBlockType1 must be exported from the Sidebar entry point',
)
assert.equal(
  typeof sidebarExports.SidebarBlockType1Trigger,
  'function',
  'SidebarBlockType1Trigger must be exported from the Sidebar entry point',
)
assert.equal(
  typeof sidebarExports.SidebarBlockType1Workspace,
  'object',
  'SidebarBlockType1Workspace must be a forwardRef export for DialogTrigger asChild composition',
)

const sidebarBlockType1 = renderToStaticMarkup(React.createElement(
  sidebarExports.SidebarProvider,
  null,
  React.createElement(
    sidebarExports.SidebarBlockType1,
    {
      brand: React.createElement('strong', null, 'Application'),
      collapsedIcon: React.createElement('span', null, 'A'),
      collapseLabel: 'Collapse navigation',
      expandLabel: 'Expand navigation',
      footer: React.createElement(
        sidebarExports.SidebarBlockType1Workspace,
        { 'aria-label': 'Open workspace details', label: 'Workspace' },
      ),
      mobileCloseLabel: 'Close navigation',
      mobileOpenLabel: 'Open navigation',
      overlayLabel: 'Close navigation',
    },
    React.createElement(
      sidebarExports.SidebarGroup,
      null,
      React.createElement(sidebarExports.SidebarGroupLabel, null, 'Programme'),
      React.createElement(
        sidebarExports.SidebarMenu,
        null,
        React.createElement(
          sidebarExports.SidebarMenuItem,
          null,
          React.createElement(
            sidebarExports.SidebarMenuButton,
            { isActive: true, tooltip: 'Dashboard' },
            React.createElement(navigationExports.NavigationIcon, { name: 'dashboard' }),
            React.createElement('span', null, 'Dashboard'),
          ),
        ),
      ),
    ),
  ),
))
assert.match(sidebarBlockType1, /class="uds-sidebar uds-sidebar-block-type-1"/)
assert.match(sidebarBlockType1, /data-collapsible="icon"/)
assert.match(sidebarBlockType1, /class="uds-sidebar-block-type-1-brand"/)
assert.match(sidebarBlockType1, /class="uds-sidebar-footer uds-sidebar-block-type-1-footer"/)
assert.match(sidebarBlockType1, /class="uds-button uds-button--ghost uds-button--size-default uds-sidebar-block-type-1-workspace"/)
assert.match(sidebarBlockType1, /aria-label="Open workspace details"/)
assert.match(sidebarBlockType1, />Workspace<\/span>/)

const toolConnectorBlock = renderToStaticMarkup(React.createElement(
  toolConnectorExports.ToolConnectorBlock,
  null,
  React.createElement(
    toolConnectorExports.ToolConnectorSection,
    { title: 'Connected', description: 'Tools linked to this workspace.' },
    React.createElement(
      toolConnectorExports.ToolConnectorList,
      null,
      React.createElement(toolConnectorExports.ToolConnectorItem, {
        actionLabel: 'Manage',
        description: 'Documents and uploads',
        detail: React.createElement('p', null, 'Connection details'),
        expanded: true,
        status: 'Connected',
        statusVariant: 'success',
        title: 'Google Drive',
      }),
    ),
  ),
))
assert.match(toolConnectorBlock, /class="uds-tool-connector-block"/)
assert.match(toolConnectorBlock, /class="uds-tool-connector-section__title" role="heading">Connected<\/div>/)
assert.match(toolConnectorBlock, /class="uds-tool-connector-list" role="list"/)
assert.match(toolConnectorBlock, /class="uds-tool-connector-item" data-expanded="true" role="listitem"/)
assert.match(toolConnectorBlock, /aria-expanded="true"/)
assert.match(toolConnectorBlock, /class="uds-badge uds-badge--success uds-badge--sm uds-tool-connector-item__status"/)
assert.match(toolConnectorBlock, /class="uds-badge-label" data-slot="label">Connected<\/span>/)
assert.match(toolConnectorBlock, /class="uds-tool-connector-item__action">Manage<\/span>/)
assert.match(toolConnectorBlock, /class="uds-tool-connector-item__detail"><p>Connection details<\/p><\/div>/)

const designSystemCss = await readFile(new URL('../packages/design-system/src/core.css', import.meta.url), 'utf8')
assert.doesNotMatch(designSystemCss, /var\(--font-size-xs\)/, 'Sidebar typography must resolve from a shipped token')
assert.match(designSystemCss, /\.uds-breadcrumb\[data-variant=['"]inverse['"]\]/)
assert.match(designSystemCss, /\.uds-breadcrumb-link,[\s\S]*\.uds-breadcrumb-page,[\s\S]*\.uds-breadcrumb-separator\s*\{[\s\S]*display:\s*inline-flex;[\s\S]*align-items:\s*center;/)
assert.match(designSystemCss, /\.uds-breadcrumb\s*\{[\s\S]*font-size:\s*var\(--font-size-small\);[\s\S]*line-height:\s*var\(--line-height-supporting\);/)
assert.match(designSystemCss, /\.uds-breadcrumb-link\s*\{[\s\S]*text-decoration:\s*none;/)
assert.match(designSystemCss, /\.uds-breadcrumb-link:hover\s*\{[\s\S]*background:\s*transparent;/)
assert.match(designSystemCss, /\.uds-breadcrumb-separator-icon\s*\{[\s\S]*inline-size:\s*var\(--icon-size-xs\);[\s\S]*block-size:\s*var\(--icon-size-xs\);/)
assert.match(designSystemCss, /\.uds-breadcrumb-separator-icon:dir\(rtl\)\s*\{[\s\S]*transform:\s*scaleX\(-1\);/)
assert.match(designSystemCss, /inset-inline-start:\s*0/, 'Sidebar active indicator must use logical inline positioning')
assert.match(designSystemCss, /\.uds-sidebar-block-type-1-footer\s*\{[\s\S]*flex-direction:\s*column;[\s\S]*padding-inline:\s*0;/)
assert.match(designSystemCss, /\.uds-sidebar-block-type-1-trigger\[data-mobile\],[\s\S]*background:\s*transparent;[\s\S]*color:\s*inherit;/)
assert.match(designSystemCss, /\.uds-sidebar-block-type-1-workspace-marker\s*\{[\s\S]*inline-size:\s*var\(--border-width-strong\);[\s\S]*background:\s*var\(--primary\);/)
assert.match(designSystemCss, /\.uds-assistant-panel\s*\{[\s\S]*border-inline-start:\s*var\(--border-width-hairline\) solid var\(--border\);/)
assert.match(designSystemCss, /\.uds-assistant-panel-body\s*\{[\s\S]*overflow-y:\s*auto;/)
assert.match(designSystemCss, /\.uds-assistant-panel-footer\s*\{[\s\S]*border-block-start:\s*var\(--border-width-hairline\) solid var\(--border\);/)
assert.doesNotMatch(
  designSystemCss,
  /\.uds-sidebar\[data-collapsed\]\s+\.uds-sidebar-group-label/,
  'Off-canvas mobile Sidebar must not inherit icon-collapse label hiding',
)

console.log('Component contract tests passed')
