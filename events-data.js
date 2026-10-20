// Shared WWL Sanctioned Tasting Event data (2026-27 season) — SINGLE SOURCE.
// This is the one place event/expression data lives. It is consumed by BOTH:
//   - the landing page's "Event Details" dialog + season list (the shim in
//     landing-src/shim.txt loads this file at runtime and adapts it), and
//   - the premium portal (portal.html), where tasters build a personal catalog.
// Edit event names/dates/specs here only; no rebuild is needed for the portal,
// and `build-landing.ps1` is only needed if you change the shim itself.
// `msrp` (optional) is the bottle price the portal uses to score a tasting in a
// taster's EU when they didn't enter one; without it the portal falls back to
// the matching xRBEU Catalog row.
// `time` (optional, e.g. "1pm CT") is appended to the date as " @ <time>" on the
// landing page's next-event box and Event Details dialog.
// `firstRound` / `finalRound` (optional, 1-4) are an expression's group ranking
// in each round; once set they show as "First Round: 2nd" etc. in the dialog.
window.WWL_EVENTS = [
  {
    name: "Wheated Whispers", date: "2026-10-18", time: "1pm CT",
    tag: "The subtler side of sipping, featuring distilling’s softer grain.",
    expressions: [
      { name: "Old Fitzgerald Bottled-in-Bond 7 Year Old Bourbon", category: "Kentucky Straight Bourbon (wheated)", mashbill: "68% corn / 20% wheat / 12% malted barley", age: "7 years", proof: "100", firstRound: 3, finalRound: 3 },
      { name: "Ben Holladay 6 Year Soft Red Wheat Rickhouse Proof Straight Bourbon Whiskey", category: "Missouri Straight Bourbon (wheated)", mashbill: "73% corn / 15% wheat / 12% malted barley", age: "6 years", proof: "123.3", firstRound: 1, finalRound: 2 },
      { name: "Weller Special Reserve", category: "Kentucky Straight Bourbon (wheated)", mashbill: "Wheated; Buffalo Trace recipe, exact percentages undisclosed", age: "No age statement", proof: "90", firstRound: 4, finalRound: 4 },
      { name: "Green River Full Proof Wheated Bourbon", category: "Kentucky Straight Bourbon (wheated)", mashbill: "70% corn / 21% wheat / 9% malted barley", age: "No age statement (aged 5-7 years)", proof: "109.3", firstRound: 2, finalRound: 1 }
    ],
    pairing: "guides/wheated-whispers-food-pairing-guide.pdf"
  },
  {
    name: "Over A Barrel", date: "2026-12-06", time: "1pm CT",
    tag: "How different oak species transform the taste of whiskey.",
    expressions: [
      { name: "Old Charter Oak Finest Oak Kentucky Straight Bourbon Whiskey", msrp: 149.99, category: "Kentucky Straight Bourbon", mashbill: "Buffalo Trace Mash Bill #1 (low-rye); exact percentages undisclosed", age: "No age statement", proof: "92", barrel: "Air-seasoned American white oak (Quercus alba) from Canton Cooperage" },
      { name: "Stillman’s Sonder 10 Year Straight Bourbon Whiskey", category: "Straight Bourbon (MGP-distilled; finished and bottled in Wisconsin)", mashbill: "Blend of MGP bourbon mashbills; exact percentages undisclosed", age: "10 years", proof: "94", barrel: "Andean oak (Quercus humboldtii)" },
      { name: "Found North Cask Strength Single Barrel, Season 4 French Oak", category: "Canadian Whisky (single barrel, cask strength)", mashbill: "71% corn / 29% wheat", age: "8 years (blend of 8- to 21-year components)", proof: "117.5", barrel: "Limousin oak (Quercus robur) from Kelvin Cooperage" },
      { name: "Heaven Hill Grain to Glass Chinquapin LE Wheated Bourbon Whiskey", category: "Kentucky Straight Bourbon (wheated)", mashbill: "52% corn / 35% wheat / 13% malted barley", age: "7 years", proof: "105", barrel: "Chinquapin oak (Quercus muehlenbergii) from Independent Stave Company" }
    ]
  },
  {
    name: "Go With The Grain", date: "2027-02-07",
    tag: "A deep dive into non-traditional mashbills.",
    expressions: [
      { name: "Koval Millet Whiskey", msrp: 52.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Dettling Single Barrel Cask Strength", msrp: 99.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Middle West Dark Pumpernickel Cask Strength Straight Rye Whiskey", msrp: 69.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Wiscy City Solo Cask 10 Year", category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Whiskey Tarot", date: "2027-04-11",
    tag: "Semi-blind tasting event: drawing four cards from the Deck of Drams.",
    expressions: [
      { name: "Jypsi Legacy Batch 001 Blended Whiskey", msrp: 181.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Widow Jane Lucky 13 Small Batch Bourbon", msrp: 119.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Bowman Brothers Small Batch", msrp: 34.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Still Austin Straight Bourbon Whiskey", msrp: 42.99, category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Full-Proof", date: "2027-06-06",
    tag: "Exploring how ABV affects our experience of the spirit.",
    expressions: [
      { name: "Basil Hayden Kentucky Straight Bourbon", msrp: 41.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Heaven Hill Bottled in Bond", msrp: 49.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "New Riff Single Barrel 6 Year Old Kentucky Straight Bourbon", msrp: 59.99, category: "", mashbill: "", age: "", proof: "" },
      { name: "Rare Character Single Barrel Series 21 Old American Light Whiskey Barrel No. 20L-564", msrp: 139.99, category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Double-Blind Experiment", date: "2027-08-08",
    tag: "WWL’s first true-blind tasting event, featuring four expressions from Buffalo Trace.",
    expressions: [
      { name: "Eagle Rare 10 Year Bourbon (2025, Japanese Export)", category: "", mashbill: "", age: "", proof: "" },
      { name: "Buffalo Trace", category: "", mashbill: "", age: "", proof: "" },
      { name: "Colonel E.H. Taylor Small Batch Bourbon (2025)", category: "", mashbill: "", age: "", proof: "" },
      { name: "Benchmark Bonded Bourbon", msrp: 19.99, category: "", mashbill: "", age: "", proof: "" }
    ]
  }
];
