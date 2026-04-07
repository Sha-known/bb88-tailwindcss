import { ObjectEditor } from '../components/ObjectEditor.js';
import { ArrayEditor }  from '../components/ArrayEditor.js';
import { showToast }    from '../utilities.js';
import { apiGet, apiPatch, apiPost, apiDelete } from '../services.js';

const API = '/api/admin/footer.php';

const decodeHtml = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};


const init = async () => {
  try {
    const data = await apiGet(API);
    const { title, credits, copyright, socials } = data;

   
    ObjectEditor.mount({
      container: '#card-title',
      label:     'Section Title',
      data:      { title: decodeHtml(title) },
      fields: [
        { key: 'title', label: 'Title', placeholder: 'e.g. Follow us on' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'title', value.title);
      },
    });

    
    ObjectEditor.mount({
      container: '#card-credits',
      label:     'Credits',
      data:      { credits: decodeHtml(credits) },
      fields: [
        { key: 'credits', label: 'Credits Text', placeholder: 'e.g. Designed & Developed by...' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'credits', value.credits);
      },
    });

    
    ObjectEditor.mount({
      container: '#card-copyright',
      label:     'Copyright',
      data:      { copyright: decodeHtml(copyright) },
      fields: [
        { key: 'copyright', label: 'Copyright Text', placeholder: 'e.g. ©2025 BB 88 Advertising...' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'copyright', value.copyright);
      },
    });

  
    ArrayEditor.mount({
      container: '#card-socials',
      label:     'Social Media Links',
      items:     socials,
      fields: [
        { key: 'label', label: 'Label', placeholder: 'e.g. Facebook'           },
        { key: 'icon',  label: 'Icon',  placeholder: 'e.g. fa-facebook-f'      },
        { key: 'link',  label: 'URL',   placeholder: 'e.g. https://facebook.com/...' },
      ],
      onSave: async (index, value) => {
        const existing = socials[index];
        await apiPatch(API, 'socials', { ...existing, ...value }, index);
      },
      onDelete: async (index) => {
        return await apiDelete(API, 'socials', index);
      },
      onAdd: async (item) => {
        return await apiPost(API, 'socials', item);
      },
    });

  } catch (e) {
    showToast(e.message, 'error');
  }
};

init();