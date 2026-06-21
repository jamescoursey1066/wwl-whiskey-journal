# xRBEU Catalog Agent — Project Instructions

## Purpose
Maintain the xRBEU Catalog: a ranked whiskey rating spreadsheet with an interactive HTML viewer.

## Key Files
| File | Role |
|------|------|
| `RBEU Catalog.xlsx` | Master spreadsheet — source of truth for all ratings |
| `add_whiskey.py` | Script to add a new whiskey entry to the spreadsheet |
| `generate_catalog_viewer.py` | Regenerates `catalog_viewer.html` from the xlsx |
| `bottle_images.json` | Maps each whiskey name → bottle image URL (or null) |
| `catalog_viewer.html` | Self-contained interactive catalog viewer (generated) |
| `update_market_prices.py` | Updates market price data |

## Adding a New Whiskey Record — Required Steps

When adding any new whiskey entry, **all four steps below are mandatory**:

### 1. Add the spreadsheet entry
Run `add_whiskey.py` with the whiskey's name, rating (0–100 scale), MSRP, notes, and BBB classification.

### 2. Find a bottle image *(required — do not skip)*
Search for an image of the specific bottle being added:
- Check the distillery's official website first
- Then check Flaviar (flaviar.com), retailer sites (Total Wine, ReserveBar, Drizly, etc.)
- The URL must point directly to the bottle image (jpg, png, webp)
- Prefer clean product-shot images with a transparent or plain background
- Confirm the image matches the **exact expression** being added (not a different release from the same brand)

### 3. Update `bottle_images.json`
Add an entry mapping the whiskey's **exact name as it appears in the xlsx** to the image URL:
```json
"Whiskey Name Exactly As In Spreadsheet": "https://..."
```
If no image can be found after a thorough search, set the value to `null` and note it.

### 4. Regenerate the catalog viewer
Run `python3 generate_catalog_viewer.py` to rebuild `catalog_viewer.html` with the new entry and its thumbnail.

## Other Important Rules

- **The whiskey name in `bottle_images.json` must exactly match the name in the xlsx** (same capitalization, punctuation, spacing). The catalog viewer does a direct key lookup.
- **Never edit `catalog_viewer.html` directly** — always regenerate it via `generate_catalog_viewer.py`.
- **WT row 30 is a fixed anchor** — do not move or alter row 30 (Wild Turkey Rare Breed) in the spreadsheet; the xRBEU formula depends on it.
- After any change to the xlsx or bottle_images.json, always regenerate and present the updated `catalog_viewer.html`.

## xRBEU Formula Reference
The xRBEU score uses an exponential fair-price model anchored at two points:
- Wild Turkey Rare Breed (row 30): live rating/price read from D30/E30
- Top anchor: rating 100 → fair price $250

Ratings use a **100-point scale** (e.g. a t8ke 6.3 is stored as 63). The WT row-30 anchor rating and the top-anchor constant (100) are both on this scale, so xRBEU scores match the original 10-point model exactly.

`xRBEU = fair_price(rating) / actual_price`  
Values > 1.0 = better than fair value; < 1.0 = overpriced.

**Tier thresholds:** S ≥ 1.75 · A ≥ 1.00 · B ≥ 0.85 · C ≥ 0.70 · D ≥ 0.50 · F < 0.50
