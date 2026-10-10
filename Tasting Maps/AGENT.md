# Tasting Map Agent — operator instructions

## Invocation
When the user says **"invoke the tasting map agent"** (or any close variant — "tasting map for X", "make me a tasting map", etc.), follow this protocol.

## Protocol
1. **Gather inputs** — if the user hasn't already provided everything, use `questions_v2` to ask for whatever's missing. Required:
   - `expression_name` (freeform) — e.g. "Hibiki Japanese Harmony"
   - `nose_notes` (freeform) — full prose tasting note for the nose
   - `palate_notes` (freeform) — full prose tasting note for the palate
   - `finish_notes` (freeform) — full prose tasting note for the finish
   - `spec_line` (freeform, optional) — see the **Spec-line standard** below for the required format.
   - `song_pairing` (freeform, optional) — the song + artist paired with this expression, rendered as the italic header line (e.g. "Tennessee Whiskey — Chris Stapleton"). **Before asking the user for this, check the xRBEU Catalog (see Song pairings below): if the expression has a record there, pull its song pairing automatically and don't ask.**

   If the user volunteered all the notes inline in their first message, skip questions_v2 — just confirm the expression name in your response and proceed.

2. **Map prose → leaves.** Map every concrete flavor descriptor in each note to a leaf on the Whiskey Flavor Wheel. Use the canonical leaf list in `flavor-data.json` (also embedded in `Tasting Maps/_template.html` as the `RAW` array). Rules:
   - Match by ordinary tasting-vocabulary equivalence (e.g. "cocoa" → Chocolate, "stewed plums" → Plum, "tannic" → Astringent, "wisps of ethanol" → Overproof, "baking spices" → both Cinnamon and Nutmeg). Be generous but truthful — only tag what's plausibly evoked by the prose.
   - A single leaf can carry multiple phase tags (Nose, Palate, Finish) if mentioned in more than one section.
   - Skip metaphors that don't map cleanly (e.g. "cathedral", "long finish" → no leaf).

3. **Build the file** by copying `Tasting Maps/_template.html` to `Tasting Maps/<Expression Name>.html` (use the user-provided expression name verbatim, with safe filename characters; preserve case and spaces). Then edit the new file to:
   - Replace the `<title>` with `<Expression Name> — Tasting Map`.
   - Replace the header lockup (eyebrow / h1 / song-pairing / spec / phase-key) following the Legent example in `Tasting Maps/Legent Yamazaki Cask Finished.html`. The `.tagline` italic line now carries the **song pairing** (song title + artist), not a descriptive tagline.
   - Inject the `TASTING` map (leaf → phase-codes), the `PHASE_COLOR` constants, and the highlight/pip rendering block. Copy the **exact** highlight CSS and JS block from the Legent file — including the `.is-tagged` styling and the per-leaf re-walk that adds `.is-tagged` classes, outlines, and phase pips.
   - Replace the bottom `<section class="legend">` and "legend" JS with the three `<article class="note-card">` blocks (Nose / Palate / Finish), each containing the prose note and a `<ul class="note-tags">` of the matched leaves.
   - Update the colophon footer to read `<Expression Name>` and the current date.

4. **Register the asset** with `register_assets` under asset name `<Expression Name> Tasting Map`, group `Brand`.

5. **Update the index** — add a new `<a class="card">` to `Tasting Map Agent.html` linking to the new file. Keep the cards in reverse chronological order (newest first). Use a sequential `No. NNN` id one greater than the highest existing.

6. **Publish + distribute copies.** Copy the finished map to `site-push/Tasting Maps/<Expression Name>.html`. The user also keeps two **local** copies on their Windows machine that this environment CANNOT write to directly:
   - `C:\Users\james\OneDrive\Documents\Claude\Projects\Whiskey Website\Tasting Maps`
   - `C:\Users\james\OneDrive\Documents\Claude\Projects\wwl-whiskey-journal-clone\Tasting Maps`
   Since the agent has no access to the local `C:\` drive, present a download card for the new map (`present_fs_item_for_download`) and remind the user to drop it into both local folders (or have their local Claude Code copy it there). Do this every time a new map is created.

7. **Surface the new file** to the user with `done`. Briefly summarize what got tagged on each phase.

## Files
- `Tasting Maps/_template.html` — clean wheel template (no highlights, no notes)
- `Tasting Maps/<Expression Name>.html` — finished tasting map for one expression
- `Tasting Map Agent.html` — landing page + library index of all maps
- `flavor-data.json` — canonical leaf list

## Spec-line standard
Every map's `.spec-line` follows a fixed five-field schema, in this order, separated by ` &middot; `:

**Distillery · Style · Mashbill · Proof · Age**

- **Distillery** is bolded (`<b>…</b>`); the other four fields are plain text.
- Use `NAS` for the age field when there is no age statement (this is informative — include it rather than omitting).
- **Omit any field that isn't publicly verifiable** rather than guessing — e.g. drop mashbill for bourbons that don't disclose it (Buffalo Trace, Beam), drop proof when unconfirmed. Never fabricate a mashbill or proof.
- Single malts are `100% Malted Barley` by definition; single malt ryes are `100% Malted Rye`; rice whiskies are `Rice`; corn whisky is `80%+ Corn`.
- Any extra detail (cask/finish, region, barrel-pick name like "El Chupacabra" / "The Hodag", release year) is **appended after** the five fields, still `&middot;`-separated. Never bold these extras.
- When creating a new map, **research the distillery, style, mashbill, proof, and age** for the real expression and fill what's verifiable; omit the rest.

Example: `<b>Garrison Brothers Distillery</b> &middot; Straight Texas Bourbon &middot; 74% Corn / 15% Wheat / 11% Malted Barley &middot; 107 Proof &middot; 6 Years &middot; Tawny Port Cask Finish`

## Song pairings (xRBEU Catalog)
- Every expression's header italic line is a **song pairing** — a song title + artist that suits the dram, rendered in the `.tagline` slot as `"Song Title" &mdash; Artist`.
- The **xRBEU Catalog** lives in this project at **`uploads/RBEU Catalog.xlsx`**. It's an `.xlsx` with inline strings (no sharedStrings table). The relevant columns: **column C = Whiskey name**, **column I = song pairing** (format `"Song Title" — Artist`). Parse it by unzipping the xlsx and reading `xl/worksheets/sheet1.xml` (see the run_script approach used to backfill the library).
- To resolve a pairing: match `expression_name` against column C (allow sensible fuzzy matching — catalog names are often longer/fuller than the map's short name, e.g. "Indri Trini Three Wood" ↔ "Indri Trini Single Malt Whisky"). If a row matches, use its column-I value verbatim.
- **If there's no matching record, ask the user for a song pairing** (don't invent one or leave it blank).
- When escaping into HTML: `&` → `&amp;`, em dash → `&mdash;`; keep the song-title quotes literal.

## Anti-patterns
- Don't invent leaves not in the wheel (e.g. don't tag "Yuzu" — closest leaf is Lemon or Orange).
- Don't tag metaphors ("warmth", "long" → not leaves).
- Don't drop the wheel template's geometry, palette, or layout — the maps need to stay visually consistent across the library.
