import { ObjectEditor } from '../components/ObjectEditor.js';
import { apiGet, apiPatch } from '../services.js';

const API = '/api/admin/ourservices.php';

// Helper function para tanggalin ang mga &amp; at ibalik sa normal na character
const decodeHTML = (html) => {
    if (!html) return '';
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

// ── INIT ──────────────────────────────────────────────────────────────────────
const init = async () => {
  try {
    const data = await apiGet(API);
    const { sectionTitle, bgImage, cards } = data;

    // ── Section Title ─────────────────────────────────────────────────────────
    ObjectEditor.mount({
      container: '#card-section-title',
      label:     'Section Title',
      data:      { sectionTitle: decodeHTML(sectionTitle) }, // Linisin ang Title
      fields: [
        { key: 'sectionTitle', label: 'Title', placeholder: 'e.g. Our Services' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'sectionTitle', value.sectionTitle);
      },
    });

    // ── Background Image ──────────────────────────────────────────────────────
    ObjectEditor.mount({
      container: '#card-section-bg',
      label:     'Background Image',
      data:      { bgImage: decodeHTML(bgImage) }, // Linisin ang Path
      fields: [
        { key: 'bgImage', label: 'Image Path', placeholder: 'e.g. src/images/bg/background2.png' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'bgImage', value.bgImage);
      },
    });

    // ── Service Cards (one ObjectEditor per card) ─────────────────────────────
    cards.forEach((card, i) => {
      // Dito natin lilinisin ang bawat field ng card bago i-load sa UI
      const cleanCard = {
        ...card,
        id: card.id || (i === 0 ? 'left' : i === 1 ? 'center' : 'right'),
        title: decodeHTML(card.title),
        image: decodeHTML(card.image),
        description: decodeHTML(card.description)
      };

      ObjectEditor.mount({
        container: `#card-service-${i}`,
        label:     `Card — ${cleanCard.id}`,
        data:      cleanCard,
        fields: [
          { key: 'title',       label: 'Title',       placeholder: 'e.g. Digital Marketing Management' },
          { key: 'image',       label: 'Image Path',  placeholder: 'e.g. src/images/vector/...'        },
          { key: 'description', label: 'Description', placeholder: 'Short description...'              },
        ],
        onSave: async (value) => {
          // Siguraduhin na kasama ang ID sa pag-save para hindi mag-undefined
          const updatedCard = { 
            ...value, 
            id: cleanCard.id 
          };
          await apiPatch(API, 'cards', updatedCard, i);
        },
      });
    });

  } catch (e) {
    console.error(e); // Para makita mo ang error sa console
  }
};

init();