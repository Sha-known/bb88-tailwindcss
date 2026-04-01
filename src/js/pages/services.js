import { ObjectEditor } from '../components/ObjectEditor.js';
import { showToast }    from '../utilities.js';
import { apiGet, apiPatch } from '../services.js';

const API = '/api/admin/services.php';

// ── INIT ──────────────────────────────────────────────────────────────────────
const init = async () => {
  try {
    const data = await apiGet(API);
    const { cards } = data;

    // ── Service Cards (one ObjectEditor per card) ─────────────────────────────
    cards.forEach((card, i) => {
    ObjectEditor.mount({
    container: `#cards-services-${i}`,
    label:     `Card — ${card.id}`,
    data:      card,
    fields: [
      { key: 'title',       label: 'Title',       placeholder: 'e.g. Digital Marketing Management' },
      { key: 'image',       label: 'Image Path',  placeholder: 'e.g. src/images/vector/...'        },
      { key: 'description', label: 'Description', placeholder: 'Short description...'              },
    ],
    onSave: async (value) => {
      // Spread yung original card muna para ma-preserve yung id
      // Tapos i-override lang yung fields na na-edit
      await apiPatch(API, 'cards', { ...card, ...value }, i);
    },
  });
});

  } catch (e) {
    showToast(e.message, 'error');
  }
};

init();

const data = await apiGet(API);

// 1. Safety Check: If data is null or empty, stop.
if (!data || !data.cards) {
    console.error("Failed to load posts data or 'services' key is missing in JSON");
} else {
    // 2. The Loop: This defines what "card" and "index" are
    data.cards.forEach((cards, index) => {
        // 3. Define the container ID dynamically
        const containerId = `#cards-services-${index}`;
        const container = document.querySelector(containerId);

        // Only mount if the HTML element actually exists
        if (container) {
            ObjectEditor.mount({
                container: containerId,
                label: `Services Card ${index + 1}`,
                data: cards,
                fields: [
                    { key: "title", label: "Card Title" },
                    { key: "image", label: "Image Path" },
                    { key: "description", label: "Card Description" },
                    
                    
                ],
                // Don't forget the save logic!
                onSave: (updatedValue) => apiPatch(API, "cards", updatedValue, index),
            });
        }
    });
}