# Landing page source (`index.html`) build

The site's root `index.html` is a **Claude-artifact / React bundle** (a "designed" page
whose visible content is rendered client-side from a gzipped bundle inside the file). It is
NOT hand-edited directly. Instead it is rebuilt from two pieces:

| File | What it is |
|---|---|
| `wwl-whiskey-journal.base.html` | The **pristine** artifact export — the page exactly as it came out of Claude Design, with no customizations. Replace this file when you re-export a new design. |
| `shim.txt` | A runtime `<script>` (the **shim**) that runs after the bundle renders and applies every customization we've layered on: wiring the dead `href="#"` nav to the real pages, the dynamic "N expressions and counting" count, the dynamic "Recently Added" cards, the daily Featured Expression, the About-section copy, the season rollover + event dialogs, etc. |

`build-landing.ps1` injects `shim.txt` into a copy of the base bundle (just before its closing
`</body></html>`, inside the bundle's `__bundler/template` block) and writes the result to
`../index.html`.

## To change the landing page

1. Edit `shim.txt` (for behavior/content) — or replace `wwl-whiskey-journal.base.html` (for a new design export).
2. Rebuild:
   ```
   powershell -ExecutionPolicy Bypass -File build-landing.ps1
   ```
3. Commit `../index.html` (and whichever source file you changed) and push. Confirm the
   GitHub Pages build goes green.

## Rules the shim MUST follow

The shim text is spliced into a **JSON string** that is itself inside a
`<script type="__bundler/template">`. To avoid breaking either layer, the shim JS must use:

- **single quotes only** — a literal `"` would end the JSON string.
- **no backslashes** in the JS — `\`-escapes aren't valid mid-JSON-string; build special
  characters with `String.fromCharCode(...)` (e.g. `’` = 8217, `“`/`”` = 8220/8221, `×` = 215,
  `·` = 183, `→` = 8594, newline = 10). For curly punctuation inside `innerHTML` strings you
  may instead use HTML entities (`&rsquo;`, `&ldquo;`, `&rdquo;`) since those are plain ASCII.
- **no literal `</`** anywhere except the script's own closing tag. Build DOM with
  `document.createElement` rather than `innerHTML` strings that contain closing tags. The one
  `</script>` at the end is auto-escaped to `<\/script>` by `build-landing.ps1`.
- **guard every `textContent`/`innerHTML` write** with an `if (current !== new)` check. A
  `MutationObserver` re-runs the shim on DOM changes; unguarded writes cause an infinite loop.

## Handy bits

- **Season data** lives in the `EVENTS` array inside `shim.txt`. Each entry is
  `{name, y, m, d, tag, items}`. An `items` entry with 5 fields
  `[name, category, mashbill, age, proof]` renders full specs in the event dialog; an entry
  with just `[name]` renders the name + "Tasting details announced closer to the event."
  Fill in later events' specs by expanding their `items` here, then rebuild.
- **Preview any date:** append `?wwl_today=YYYY-MM-DD` to the landing-page URL to see the
  "Next Sanctioned Event" / completed-events state as of that date (e.g.
  `.../wwl-whiskey-journal/?wwl_today=2027-03-01`). Harmless in normal use.
- The daily Featured Expression and Recently Added cards read live data at runtime from
  `journal.html` (the catalog) and `rbeu-catalog/affinity_fingerprint.html`, so they update
  themselves as the catalog grows — no rebuild needed for those.
