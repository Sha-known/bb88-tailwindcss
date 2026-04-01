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