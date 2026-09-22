// Shared WWL Sanctioned Tasting Event data (2026-27 season).
// This is the same event/expression data shown by the homepage "Event Details"
// dialog. The premium portal reads it so tasters can build a personal catalog
// entry for each sanctioned expression.
// NOTE: the landing page's shim (landing-src/shim.txt) currently keeps its own
// inline copy of this list. Keep the two in sync until they are unified.
window.WWL_EVENTS = [
  {
    name: "Wheated Whispers", date: "2026-10-18",
    tag: "The subtler side of sipping, featuring distilling’s softer grain.",
    expressions: [
      { name: "Old Fitzgerald Bottled-in-Bond 7 Year Old Bourbon", category: "Kentucky Straight Bourbon (wheated)", mashbill: "68% corn / 20% wheat / 12% malted barley", age: "7 years", proof: "100" },
      { name: "Ben Holladay 6 Year Soft Red Wheat Rickhouse Proof Straight Bourbon Whiskey", category: "Missouri Straight Bourbon (wheated)", mashbill: "73% corn / 15% wheat / 12% malted barley", age: "6 years", proof: "123.3" },
      { name: "Weller Special Reserve", category: "Kentucky Straight Bourbon (wheated)", mashbill: "Wheated; Buffalo Trace recipe, exact percentages undisclosed", age: "No age statement", proof: "90" },
      { name: "Green River Full Proof Wheated Bourbon", category: "Kentucky Straight Bourbon (wheated)", mashbill: "70% corn / 21% wheat / 9% malted barley", age: "No age statement (aged 5-7 years)", proof: "109.3" }
    ]
  },
  {
    name: "Over A Barrel", date: "2026-12-06",
    tag: "How different oak species transform the taste of whiskey.",
    expressions: [
      { name: "Old Charter Oak Finest Oak Kentucky Straight Bourbon Whiskey", category: "", mashbill: "", age: "", proof: "" },
      { name: "Stillman’s Sonder 10 Year Straight Bourbon Whiskey", category: "", mashbill: "", age: "", proof: "" },
      { name: "Found North Cask Strength Single Barrel, Season 4 French Oak", category: "", mashbill: "", age: "", proof: "" },
      { name: "Heaven Hill Grain to Glass Chinquapin LE Wheated Bourbon Whiskey", category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Go With The Grain", date: "2027-02-07",
    tag: "A deep dive into non-traditional mashbills.",
    expressions: [
      { name: "Koval Millet Whiskey", category: "", mashbill: "", age: "", proof: "" },
      { name: "Dettling Single Barrel Cask Strength", category: "", mashbill: "", age: "", proof: "" },
      { name: "Middle West Dark Pumpernickel Cask Strength Straight Rye Whiskey", category: "", mashbill: "", age: "", proof: "" },
      { name: "Wiscy City Solo Cask 10 Year", category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Whiskey Tarot", date: "2027-04-11",
    tag: "Semi-blind tasting event: drawing four cards from the Deck of Drams.",
    expressions: [
      { name: "Jypsi Legacy Batch 001 Blended Whiskey", category: "", mashbill: "", age: "", proof: "" },
      { name: "Widow Jane Lucky 13 Small Batch Bourbon", category: "", mashbill: "", age: "", proof: "" },
      { name: "Bowman Brothers Small Batch", category: "", mashbill: "", age: "", proof: "" },
      { name: "Still Austin Straight Bourbon Whiskey", category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Full-Proof", date: "2027-06-06",
    tag: "Exploring how ABV affects our experience of the spirit.",
    expressions: [
      { name: "Basil Hayden Kentucky Straight Bourbon", category: "", mashbill: "", age: "", proof: "" },
      { name: "Heaven Hill Bottled in Bond", category: "", mashbill: "", age: "", proof: "" },
      { name: "New Riff Single Barrel 6 Year Old Kentucky Straight Bourbon", category: "", mashbill: "", age: "", proof: "" },
      { name: "Rare Character Single Barrel Series 21 Old American Light Whiskey Barrel No. 20L-564", category: "", mashbill: "", age: "", proof: "" }
    ]
  },
  {
    name: "Double-Blind Experiment", date: "2027-08-08",
    tag: "WWL’s first true-blind tasting event, featuring four expressions from Buffalo Trace.",
    expressions: [
      { name: "Eagle Rare 10 Year Bourbon (2025, Japanese Export)", category: "", mashbill: "", age: "", proof: "" },
      { name: "Buffalo Trace", category: "", mashbill: "", age: "", proof: "" },
      { name: "Colonel E.H. Taylor Small Batch Bourbon (2025)", category: "", mashbill: "", age: "", proof: "" },
      { name: "Benchmark Bonded Bourbon", category: "", mashbill: "", age: "", proof: "" }
    ]
  }
];
