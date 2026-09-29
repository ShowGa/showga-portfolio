# i18n Implementation Guide (for AI Agent)

This document tells an AI coding agent how to implement, extend, and maintain i18n (internationalization) translations in this React project. Follow it whenever adding a new translatable file, refactoring an existing one, or reviewing an i18n-related PR.

## 1. Stack & Core Files

- **Stack**: `i18next` + `react-i18next` + `i18next-browser-languagedetector` + `i18next-http-backend`
- **Config**: `/src/i18n_config.js`
- **Hook**: `/src/hooks/useI18nHook.js`
- **Supported languages list**: `/src/constants/language.js`

### How it works

- Language detection order: `localStorage` (key: `i18nextLng`), and detected language is cached back to `localStorage`.
- Translation JSON files are loaded dynamically via the HTTP backend from:
  `/locales/{{lng}}/{{ns}}.json`
- No default namespace is configured. Always pass the namespace explicitly via `useI18nHook(ns)` — never rely on an implicit/default namespace.
- `fallbackLng`: `en`
- Currently supported languages (see `/src/constants/language.js`):
  | value | label |
  |---|---|
  | `zh-TW` | 中 |
  | `en` | EN |

    When adding a new language, add an entry to this array **and** create the corresponding `/locales/{{lng}}/*.json` files for every existing namespace.

### `useI18nHook` usage

```js
const { t, i18n, switchLang } = useI18nHook(ns);
```

- `ns` — the namespace string. This **must** equal the i18n JSON filename (without `.json`) that corresponds to the file being translated (see naming convention below).
- `t` — translation function, called as `t("key.path")`.
- `i18n` — the underlying i18next instance.
- `switchLang(lng, callback?)` — changes the active language; persistence is handled by i18next's language detector cache (`localStorage`, key `i18nextLng`) rather than by manual `localStorage.setItem` calls. Do not add manual `localStorage` writes for language persistence. An optional callback runs after the switch.

## 2. Where translation files live

`/public/locales/{{lng}}/{{ns}}.json` — one JSON file per namespace, per language.

Example: `Hero.jsx` → `/public/locales/en/section-Hero.json` and `/public/locales/zh-TW/section-Hero.json`.

Rules:

- Every supported language (`en`, `zh-TW`) must contain every namespace file.
- All language files within the same namespace must have **identical key structures** (same key paths, same nesting).
- Translation **values** differ by language — only the keys must match.
- Never add/remove a key in one language's file without mirroring the change in all others.

## 3. Namespace / filename naming convention

The JSON filename is prefixed to indicate where its content comes from:

| Prefix       | Source                                       | Example                                     |
| ------------ | -------------------------------------------- | ------------------------------------------- |
| `section-`   | A regular JSX/component file (non-constants) | `Hero.jsx` → `section-Hero.json`            |
| `constants-` | A constants file                             | `techStack.js` → `constants-techStack.json` |

Pattern: `{{prefix}}-{{source data file name}}.json`

The `ns` argument passed into `useI18nHook(ns)` must match this filename (without `.json`).

## 4. JSON structure conventions

### 4.1 Normal JSX/component files → `section-*.json`

- Free-form nested object structure — organize keys to match the component's content/visual structure.
- Key naming is up to the agent/developer, as long as it is descriptive and consistent.

```json
// section-Hero.json
{
    "title": "Welcome",
    "hero": {
        "heading": "Build faster",
        "subheading": "Ship your app in days"
    }
}
```

Usage in component:

```jsx
const { t } = useI18nHook("section-Hero");
<h1>{t("hero.heading")}</h1>;
```

### 4.2 Constants files → `constants-*.json`

Unlike section files, the JSON structure is **not** free-form — it must mirror the object structure of the source constants file:

- JSON key names = the constants object's property names/paths (including array indices where relevant).
- In the source `.js` constants file, replace the literal translatable string with its i18n key **as a string**, and append a `// i18n key` comment.

**Before** (`/src/constants/techStack.js`):

```js
const techStack = [
    { name: "React", description: "A JavaScript library for building UIs" },
];
```

**After**:

```js
const techStack = [
    { name: "React", description: "techStack.0.description" }, // i18n key
];
```

**`constants-techStack.json`**:

```json
{
    "techStack": {
        "0": {
            "description": "A JavaScript library for building user interfaces"
        }
    }
}
```

Usage:

```js
const { t } = useI18nHook("constants-techStack");
t(item.description); // item.description holds the i18n key string
```

### 4.3 Fields that should NOT be translated

Some properties in constants files are not human-readable copy and must be left untouched (no i18n key, no `// i18n key` comment). Common examples:

- Tech stack / library / product names (e.g. `"React"`, `"Node.js"`)
- Image `src` paths
- `href` / URLs / route paths
- Icon names, color values, class names, or other non-linguistic identifiers

Rule of thumb: only convert strings that are **end-user-facing prose**. Skip anything that is a reference, path, identifier, or proper noun that should stay identical across languages.

**Accessibility text**: `alt`, `aria-label`, and similar attributes **should** be translated via `t()` when their content is language-dependent (e.g. `alt="A man smiling"`, `aria-label="Close menu"`). Do not translate them when they hold a non-linguistic identifier (e.g. `alt="logo-react"`, `aria-label="modal-1"`).

## 5. Handling existing text variables

Some translatable text is currently held in a variable rather than being an inline string literal — either declared **outside** the component (module scope) or **inside** the component/function body.

**Rule: do not delete these variables.** Keep the variable name (so nothing else in the code that references it breaks) and reassign its value using the i18n key, but the assignment must happen **inside** the component function so `t` is in scope:

- If the variable was declared **outside** the JSX function (module-level `const`), move its declaration **inside** the component function body, and assign it with `t()`.
- If the variable was already declared **inside** the JSX function, just replace its literal value with `t()`.

```js
// Before (outside the component)
const text = "Welcome to our platform";

function Hero() {
    return <h1>{text}</h1>;
}
```

```js
// After — moved inside the component, same variable name kept
function Hero() {
    const { t } = useI18nHook("section-Hero");
    const text = t("hero.text"); // was a module-level const, now defined inside so `t` is in scope

    return <h1>{text}</h1>;
}
```

- Never simply delete the variable and inline `t("...")` in its place if other code (JSX or logic) still refers to the variable by name — keep the variable as the binding, just move/reassign it.
- Non-translatable variables (URLs, class names, config values, etc.) are unaffected by this rule — leave them wherever they are declared.

## 6. Implementation Checklist

When implementing or reviewing i18n for a file:

1. Identify the source file and derive its namespace (`section-` / `constants-` + filename, see §3).
2. Extract only user-facing strings — skip fields listed in §4.3, apply the accessibility-text rule where relevant.
3. **JSX files**: use `useI18nHook(ns)` and replace hardcoded strings with `t("key.path")`.
4. **Constants files**: replace translatable values with i18n key strings and add `// i18n key`; build the matching JSON keyed by the same property paths (§4.2).
5. Preserve existing text variables (§5) — keep the variable name, move/define it inside the component function, assign via `t()`. Never delete a variable that's still referenced elsewhere.
6. Create/update the namespace JSON for every supported locale (`en`, `zh-TW`).
7. Ensure all locale files for that namespace have identical key structures (values may differ).
8. Verify with `switchLang` that all supported languages render without missing-key fallbacks.

Before completion:

- [ ] Namespace follows `section-{file}` / `constants-{file}` convention and matches the JSON filename exactly
- [ ] No default namespace relied upon — `ns` passed explicitly
- [ ] All locales (`en`, `zh-TW`) have identical key structures for this namespace
- [ ] Constants file: translatable strings replaced with i18n keys + `// i18n key` comment
- [ ] Constants file: non-translatable fields (image src, href, product/tech names, etc.) left unchanged
- [ ] Accessibility attributes (`alt`, `aria-label`, etc.) translated only when language-dependent
- [ ] No hardcoded user-facing text remains in the component
- [ ] Existing text variables preserved — moved inside the component and assigned via `t()`, not deleted
- [ ] No manual `localStorage` writes added for language persistence
- [ ] App verified in all supported languages (`en`, `zh-TW`)

## 7. Custom Guide

Project-specific exceptions that override the general rules above.

1. **`AnimatedHeaderSection` — do not implement i18n on the `subTitle` and `title` props.** These two props must stay as plain hardcoded strings; do not wrap them with `t()` or create i18n keys for them, even though they are user-facing text. Other props on this component (e.g. `text`) still follow the normal rules.

    ```jsx
    <AnimatedHeaderSection
        subTitle={"Action comes from passion"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
    />
    ```

2. **Do not translate `zh-TW` values yourself.** Still implement the full i18n setup for every language — create the JSON file/structure for `en` **and** `zh-TW`, add the correct keys, and update the source files (JSX/constants) to use `t()` / i18n keys as usual. But for the `zh-TW` JSON file, do not write actual Chinese translations — just use the original English text (as originally typed in the source file) as the value, identical to the `en` JSON. The user will translate the `zh-TW` values themselves afterward.

    ```json
    // en/section-Hero.json
    { "hero": { "heading": "Build faster" } }
    ```

    ```json
    // zh-TW/section-Hero.json — same value as en, not yet translated
    { "hero": { "heading": "Build faster" } }
    ```
