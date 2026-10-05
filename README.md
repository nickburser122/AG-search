# AG Search — Formulary & Patient Contribution

A fast, elegant, typo-tolerant formulary lookup for pharmacists and casual users. It works offline after the first visit.

## Features
- **1,121 items**: 977 free formulary items (0 EGP) and 144 paid items with the patient contribution.
- **Paid pricing types**: a fixed EGP amount; separate **هيئة / طلاب** amounts for insulins; and "50% من سعر التوريد" for some inhalers.
- **Typo-tolerant search**: phonetic matching (ph→f, c→k, double letters), edit distance with transpositions, prefix typos, multi-word AND with an OR fallback, a "Showing results for…" correction note, brand ↔ generic aliases, and strength numbers (`crestor 10`).
- **Arabic keyboard rescue**: typing English with the Arabic layout active (e.g. `لمعؤخحاشلث` → glucophage).
- **Filters**: All / Free / Paid segmented control with live counts, plus Class, Form, Sort (best match, A→Z, price ↑/↓) and Saved (♥).
- **Detail view**: big price block, facts, and cross-links (paid brands ↔ free generic alternatives).
- **Layout**: on desktop, the list and a sticky detail pane sit side by side with keyboard navigation (`/`, ↑↓, Enter, Esc). On mobile, details open in a swipe-to-close bottom sheet.
- Light/dark theme, recents, saved items, copy, shareable URLs, PWA manifest and a service worker.
- New feminine flower-of-pills logo and favicon in the rose palette.

## Entry URIs
- `index.html?q=<query>&price=free|paid&class=<group>&form=<formKey>`

## Files
- `index.html`, `css/style.css`, `js/app.js`: the app
- `js/paid.js`: paid items `[name, pack, form, price, هيئة, طلاب, note, generic, classCode, aliases]`
- `data/formulary.txt`: the original file, used as the source of the free list (the `const DATA=` line is parsed and cached in localStorage)
- `images/logo.svg`, `images/favicon.svg`, `images/icon-maskable.svg`, `manifest.webmanifest`, `sw.js`

## Storage
Local only (localStorage): `ag.theme`, `ag.pins`, `ag.recents`, `ag.free.v2`. No backend.

## Next steps
- Move the free list into its own small JSON file so the first load is lighter.
- Add an admin flow to edit prices.
