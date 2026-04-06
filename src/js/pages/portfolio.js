import { ArrayEditor } from '../components/ArrayEditor.js';
import { showToast }   from '../utilities.js';
import { apiGet, apiPatch, apiPost, apiDelete } from '../services.js';

const API = '/api/admin/portfolio.php';


const init = async () => {
  try {
    const data = await apiGet(API);
    const { projects } = data;

   
    ArrayEditor.mount({
      container: '#card-projects',
      label:     'Portfolio Projects',
      items:     projects,
      fields: [
        { key: 'title',    label: 'Title',    placeholder: 'e.g. BC Bagsakan Pickup'         },
        { key: 'img',      label: 'Image',    placeholder: 'e.g. src/images/picture/pic1.png' },
        { key: 'category', label: 'Category', placeholder: 'e.g. mobile, brand, socmed'       },
        { key: 'desc',     label: 'Description', placeholder: 'Short description...'          },
      ],
      onSave: async (index, value) => {
       
        const existing = projects[index];
        await apiPatch(API, 'projects', { ...existing, ...value }, index);
      },
      onDelete: async (index) => {
        return await apiDelete(API, 'projects', index);
      },
      onAdd: async (item) => {
        
        return await apiPost(API, 'projects', { ...item, isHidden: true });
      },
    });

  } catch (e) {
    showToast(e.message, 'error');
  }
};

init();