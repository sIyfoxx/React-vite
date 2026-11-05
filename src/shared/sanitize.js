/** Опасные конструкции, типичные для XSS */
const XSS_PATTERNS = [
  /<\s*script\b/i,
  /<\s*\/\s*script\b/i,
  /<\s*iframe\b/i,
  /<\s*object\b/i,
  /<\s*embed\b/i,
  /<\s*svg\b/i,
  /<\s*img\b/i,
  /<\s*link\b/i,
  /<\s*style\b/i,
  /<\s*meta\b/i,
  /<\s*form\b/i,
  /<\s*input\b/i,
  /<\s*button\b/i,
  /javascript\s*:/i,
  /vbscript\s*:/i,
  /data\s*:\s*text\/html/i,
  /\bon\w+\s*=/i,
  /expression\s*\(/i,
  /url\s*\(\s*['"]?\s*javascript\s*:/i,
  /&#x?0*0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?0?3[ceCE]/,
  /&lt\s*;\s*script/i,
];

const HTML_TAG_RE = /<\/?[\w:-]+(?:\s[^>]*)?>/gi;
const PROTOCOL_RE = /(?:javascript|vbscript|data)\s*:/gi;
const EVENT_HANDLER_RE = /\son\w+\s*=\s*(?:(['"]).*?\1|[^\s>]+)/gi;
const CONTROL_CHARS_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const ANGLE_BRACKETS_RE = /[<>]/g;
const DANGEROUS_CHARS_RE = /[`\\]/g;

export function hasXssPayload(value) {
  if (typeof value !== 'string' || value.length === 0) return false;
  return XSS_PATTERNS.some((pattern) => pattern.test(value));
}

/**
 * Очищает пользовательский текст от XSS-паттернов регулярками.
 * React и так экранирует JSX-текст — это доп. защита входных данных.
 */
export function sanitizeText(value, { maxLength = 2000 } = {}) {
  if (typeof value !== 'string') return '';

  let clean = value
    .replace(CONTROL_CHARS_RE, '')
    .replace(HTML_TAG_RE, '')
    .replace(EVENT_HANDLER_RE, ' ')
    .replace(PROTOCOL_RE, '')
    .replace(ANGLE_BRACKETS_RE, '')
    .replace(DANGEROUS_CHARS_RE, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length > maxLength) {
    clean = clean.slice(0, maxLength).trim();
  }

  // Если после чистки всё ещё похоже на XSS — отбрасываем целиком
  if (hasXssPayload(clean)) return '';

  return clean;
}

/** Имя автора: без разметки и спецсимволов */
export function sanitizeName(value, { maxLength = 40 } = {}) {
  const clean = sanitizeText(value, { maxLength })
    .replace(/[/{}\[\]|;$%^*=]/g, '')
    .trim();

  return clean;
}
