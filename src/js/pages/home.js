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
    label: `Service Card ${index + 1}`,
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