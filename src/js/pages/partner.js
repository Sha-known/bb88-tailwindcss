import { ArrayEditor } from '../components/ArrayEditor.js';
import { showToast }   from '../utilities.js';
import { apiGet, apiPatch, apiPost, apiDelete } from '../services.js';

const API = '/api/admin/partner.php';


const init = async () => {
  try {
    const data = await apiGet(API);
    const { logos } = data;

    // ── Partner Logos — Full CRUD via ArrayEditor 
    ArrayEditor.mount({
      container: '#card-logos',
      label:     'Partner Logos',
      items:     logos,
      fields: [
        { key: 'src',  label: 'Image Path', placeholder: 'e.g. src/images/logo/logo1.png' },
        { key: 'href', label: 'Link (URL)', placeholder: 'e.g. https://facebook.com/...'  },
      ],
      onSave: async (index, value) => {
        await apiPatch(API, 'logos', value, index);
      },
      onDelete: async (index) => {
        return await apiDelete(API, 'logos', index);
      },
      onAdd: async (item) => {
        return await apiPost(API, 'logos', item);
      },
    });

  } catch (e) {
    showToast(e.message, 'error');
  }
};

init();