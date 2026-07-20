import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { isAbsolute, relative, resolve } from 'node:path'

const manifestName = 'ceramic.template.json'
const sourceExtensions = /\.(css|html|js|jsx|md|mjs|ts|tsx)$/i
const secretName = /(^|\/)(\.env($|\.)|.*\.(pem|key|p12|pfx))$/i
const installScript = /^(preinstall|install|postinstall)$/

function issue(code, message, path = manifestName) {
  return { code, message, path }
}

function inside(root, candidate) {
  const path = relative(root, candidate)
  return path === '' || (!path.startsWith('..') && !isAbsolute(path))
}

function walk(directory, root = directory, state = { files: [], symlinks: [] }) {
  for (const name of readdirSync(directory)) {
    if (['.git', 'dist', 'node_modules'].includes(name)) continue
    const path = resolve(directory, name)
    const relativePath = relative(root, path)
    const stats = lstatSync(path)
    if (stats.isSymbolicLink()) state.symlinks.push(relativePath)
    else if (stats.isDirectory()) walk(path, root, state)
    else state.files.push(relativePath)
  }
  return state
}

export function validateTemplateSubmission(directory = process.cwd()) {
  const root = resolve(directory)
  const manifestPath = resolve(root, manifestName)
  const errors = []
  const warnings = []

  if (!existsSync(manifestPath)) {
    return { ok: false, root, manifestPath, manifest: null, files: [], errors: [issue('MANIFEST_MISSING', `${manifestName} is required.`)], warnings }
  }

  let manifest
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch (error) {
    return { ok: false, root, manifestPath, manifest: null, files: [], errors: [issue('MANIFEST_JSON', `Manifest is not valid JSON: ${error.message}`)], warnings }
  }

  const requiredStrings = ['id', 'name', 'version', 'summary', 'category', 'license', 'repository', 'entry']
  for (const field of requiredStrings) {
    if (typeof manifest[field] !== 'string' || !manifest[field].trim()) errors.push(issue('FIELD_REQUIRED', `${field} must be a non-empty string.`))
  }
  if (manifest.schemaVersion !== 1) errors.push(issue('SCHEMA_VERSION', 'schemaVersion must be 1.'))
  if (manifest.id && !/^[a-z][a-z0-9-]*$/.test(manifest.id)) errors.push(issue('ID_FORMAT', 'id must use lowercase kebab-case.'))
  if (manifest.version && !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(manifest.version)) errors.push(issue('VERSION_FORMAT', 'version must use semantic versioning.'))
  if (manifest.summary && manifest.summary.trim().length < 20) errors.push(issue('SUMMARY_LENGTH', 'summary must contain at least 20 characters.'))
  if (manifest.category && !['application', 'dashboard', 'website', 'workflow', 'commerce', 'content', 'other'].includes(manifest.category)) errors.push(issue('CATEGORY_VALUE', 'category is not supported by the community catalog.'))
  if (manifest.repository && !/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/.test(manifest.repository)) errors.push(issue('REPOSITORY_FORMAT', 'repository must be a public GitHub repository URL.'))
  if (manifest.preview && !/^https:\/\//.test(manifest.preview)) errors.push(issue('PREVIEW_FORMAT', 'preview must be an HTTPS URL.'))
  if (!manifest.author || typeof manifest.author.name !== 'string' || !manifest.author.name.trim()) errors.push(issue('AUTHOR_REQUIRED', 'author.name is required.'))
  if (manifest.designSystem?.package !== '@utopia-studio-design/design-system' || typeof manifest.designSystem?.version !== 'string') {
    errors.push(issue('DESIGN_SYSTEM_CONTRACT', 'designSystem must declare the Ceramic package and compatible version.'))
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0 || manifest.files.some((file) => typeof file !== 'string')) errors.push(issue('FILES_REQUIRED', 'files must list at least one source path.'))
  if (!Array.isArray(manifest.themes) || manifest.themes.length === 0) errors.push(issue('THEMES_REQUIRED', 'themes must list at least one tested Ceramic theme.'))
  for (const feature of ['responsive', 'darkMode', 'rtl']) {
    if (manifest.features?.[feature] !== true) errors.push(issue('FEATURE_REQUIRED', `features.${feature} must be true.`))
  }

  for (const field of [manifest.entry, ...(Array.isArray(manifest.files) ? manifest.files : [])]) {
    if (typeof field !== 'string') continue
    const path = resolve(root, field)
    if (!inside(root, path)) errors.push(issue('PATH_TRAVERSAL', `Path must stay inside the template: ${field}`, field))
    else if (!existsSync(path)) errors.push(issue('FILE_MISSING', `Declared path does not exist: ${field}`, field))
    else if (!inside(realpathSync(root), realpathSync(path))) errors.push(issue('PATH_SYMLINK', `Declared path resolves outside the template: ${field}`, field))
  }

  const scan = walk(root)
  const files = scan.files
  for (const file of scan.symlinks) errors.push(issue('SYMLINK', 'Symbolic links cannot be submitted.', file))
  for (const file of files) {
    if (secretName.test(file) && !file.endsWith('.example')) errors.push(issue('SECRET_FILE', 'Secret or private-key files cannot be submitted.', file))
  }

  const packagePath = resolve(root, 'package.json')
  if (existsSync(packagePath)) {
    try {
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
      for (const script of Object.keys(packageJson.scripts ?? {})) {
        if (installScript.test(script)) errors.push(issue('INSTALL_SCRIPT', `package.json cannot include a ${script} script.`, 'package.json'))
      }
    } catch (error) {
      errors.push(issue('PACKAGE_JSON', `package.json is not valid JSON: ${error.message}`, 'package.json'))
    }
  }

  let importsCeramic = false
  let rawColors = 0
  let physicalLayout = 0
  for (const file of files.filter((name) => sourceExtensions.test(name))) {
    const content = readFileSync(resolve(root, file), 'utf8')
    if (content.includes('@utopia-studio-design/design-system')) importsCeramic = true
    rawColors += content.match(/#[\da-fA-F]{3,8}\b/g)?.length ?? 0
    physicalLayout += content.match(/\b(margin|padding|border)-(left|right)\b|\b(left|right)\s*:/g)?.length ?? 0
  }
  if (!importsCeramic) errors.push(issue('CERAMIC_IMPORT', 'Template source must import @utopia-studio-design/design-system.'))
  if (rawColors > 0) warnings.push(issue('RAW_COLOR', `${rawColors} raw color value(s) found. Use semantic tokens unless the value belongs to approved theme-owned media.`))
  if (physicalLayout > 0) warnings.push(issue('PHYSICAL_LAYOUT', `${physicalLayout} physical left/right declaration(s) found. Use logical properties for RTL.`))

  return { ok: errors.length === 0, root, manifestPath, manifest, files, errors, warnings }
}

export function createTemplateSubmissionUrl(result) {
  if (!result.ok || !result.manifest) return null
  const manifest = result.manifest
  const title = `[Community template] ${manifest.name} ${manifest.version}`
  const body = [
    '## Community template submission', '',
    `- Template: ${manifest.name}`,
    `- ID: \`${manifest.id}\``,
    `- Version: \`${manifest.version}\``,
    `- Author: ${manifest.author.name}`,
    `- Repository: ${manifest.repository}`,
    `- Preview: ${manifest.preview ?? 'Not provided'}`,
    `- Ceramic compatibility: \`${manifest.designSystem.version}\``,
    `- Tested themes: ${manifest.themes.join(', ')}`, '',
    '## Contributor declaration', '',
    '- [x] `npx utopia-ds template validate .` passes.',
    '- [x] I have the right to submit this source and its assets.',
    '- [x] Demo claims and data are clearly identified and are not presented as production facts.',
    '- [x] The template supports responsive layout, dark mode, keyboard use, and RTL.', '',
    'Ceramic maintainers: review the pinned commit or release from the repository before approving this template.',
  ].join('\n')
  const query = new URLSearchParams({ title, body })
  return `https://github.com/The-Utopia-Studio/Ceramic-Design-System/issues/new?${query}`
}

export const communityTemplateManifestName = manifestName
