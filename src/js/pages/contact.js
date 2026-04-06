import { ObjectEditor } from '../components/ObjectEditor.js';
import { ArrayEditor }  from '../components/ArrayEditor.js';
import { showToast }    from '../utilities.js';
import { apiGet, apiPatch, apiPost, apiDelete } from '../services.js';

const API = '/api/admin/contact.php';

const decodeHtml = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};


const init = async () => {
  try {
    const data = await apiGet(API);
    const { title, subtitle, mapSrc, company, contactInfo } = data;

    
    ObjectEditor.mount({
      container: '#card-title',
      label:     'Section Title',
      data:      { title: decodeHtml(title) },
      fields: [
        { key: 'title', label: 'Title', placeholder: 'e.g. Contact Us' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'title', value.title);
      },
    });

    
    ObjectEditor.mount({
      container: '#card-subtitle',
      label:     'Subtitle',
      data:      { subtitle: decodeHtml(subtitle) },
      fields: [
        { key: 'subtitle', label: 'Subtitle', placeholder: 'e.g. For immediate assistance...' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'subtitle', value.subtitle);
      },
    });

    
    ObjectEditor.mount({
      container: '#card-mapsrc',
      label:     'Google Maps Embed URL',
      data:      { mapSrc: decodeHtml(mapSrc) },
      fields: [
        { key: 'mapSrc', label: 'Map Embed URL', placeholder: 'https://www.google.com/maps/embed?...' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'mapSrc', value.mapSrc);
      },
    });

   
    ObjectEditor.mount({
      container: '#card-company',
      label:     'Company Info',
      data: {
        name:   decodeHtml(company.name),
        suffix: decodeHtml(company.suffix),
      },
      fields: [
        { key: 'name',   label: 'Company Name',   placeholder: 'e.g. BB 88 ADVERTISING'          },
        { key: 'suffix', label: 'Company Suffix',  placeholder: 'e.g. AND DIGITAL SOLUTIONS INC.' },
      ],
      onSave: async (value) => {
        await apiPatch(API, 'company', value);
      },
    });

    
    ArrayEditor.mount({
      container: '#card-contactinfo',
      label:     'Contact Info Items',
      items:     contactInfo,
      fields: [
        { key: 'icon',  label: 'Icon Path', placeholder: 'e.g. src/images/icon/iconphone.png' },
        { key: 'label', label: 'Label',     placeholder: 'e.g. Phone:'                         },
        { key: 'value', label: 'Value',     placeholder: 'e.g. +63 45 963 2025'                },
        // TINANGGAL YUNG ICON CLASS AT CIRCLE CLASS
      ],
      onSave: async (index, value) => {
        const existing = contactInfo[index];
       
        await apiPatch(API, 'contactInfo', { ...existing, ...value }, index);
      },
      onDelete: async (index) => {
        return await apiDelete(API, 'contactInfo', index);
      },
      onAdd: async (item) => {
        
        const newItemWithClasses = {
            ...item,
            iconClass: 'w-12.5 h-12.5', // Default class
            circleClass: 'w-16.25 h-16.25' // Default class
        };
        return await apiPost(API, 'contactInfo', newItemWithClasses);
      },
    });

  } catch (e) {
    showToast(e.message, 'error');
  }
};

init();