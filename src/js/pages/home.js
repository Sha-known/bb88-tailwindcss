import { apiGet, apiPatch } from "../services.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/home.php";
const data = await apiGet(API);

// ── HERO SECTION ──────────────────────────────────────────────────

// Hero CTA
ObjectEditor.mount({
  container: "#card-hero-cta",
  label: "CTA",
  data: data.hero.cta,
  fields: [
    { key: "text", label: "Button Text" },
    { key: "link", label: "Button Link" },
  ],
  onSave: (value) => apiPatch(API, "hero.cta", value),
});

// Hero Video Button
ObjectEditor.mount({
  container: "#card-hero-video",
  label: "Hero Video Link",
  data: data.hero.video,
  fields: [
    { key: "text", label: "Video Button Text" },
    { key: "link", label: "Video URL" },
  ],
  onSave: (value) => apiPatch(API, "hero.video", value),
});

// ── ABOUT SECTION (SERVICE CARDS) ──────────────────────────────────

// We loop through the existing cards and create an editor for each.
// This prevents adding/deleting and only allows editing.
data.about.cards.forEach((card, index) => {
  // We need a unique container for each card in your HTML
  const containerId = `#card-service-${index}`;
  
  ObjectEditor.mount({
    container: containerId,
    label: `About Us Card ${index + 1}`,
    data: card,
    fields: [
      { key: "title", label: "Card Title" },
      { key: "icon", label: "Icon Path" },
      { key: "hoverIcon", label: "Hover Icon Path" },
    ],
    // We send the index to the PATCH so the PHP knows which card to update
    onSave: (value) => apiPatch(API, "about.cards", value, index),
  });
});

// ── ABOUT US BOX (FLATTENED ARRAY FIX) ─────────────────────

// 1. Prepare a "Flattened" version of the box data (para mafetch ng ObjectEditor ung paragraph dun sa json data sa database)
const flattenedBoxData = {
    title: data.about.box.title,
    subtitle: data.about.box.subtitle,
    p0: data.about.box.paragraphs[0],
    p1: data.about.box.paragraphs[1],
    p2: data.about.box.paragraphs[2]
};

ObjectEditor.mount({
    container: "#card-about-box",
    label: "About Us Content",
    data: flattenedBoxData, // Use the flat data here (if hindi finlat ung data, d sya mashowshow, d mafefetch)
    fields: [
        { key: "title", label: "Main Title" },
        { key: "subtitle", label: "Sub-headline" },
        { key: "p0", label: "Paragraph 1", type: "textarea" },
        { key: "p1", label: "Paragraph 2", type: "textarea" },
        { key: "p2", label: "Paragraph 3", type: "textarea" },
    ],
    onSave: (updated) => {
        // 2. Reconstruct the array format before sending to API
        const payload = {
            title: updated.title,
            subtitle: updated.subtitle,
            paragraphs: [updated.p0, updated.p1, updated.p2]
        };
        
        // 3. Send the clean array back to the database
        return apiPatch(API, "about.box", payload);
    }
});

