import { apiGet, apiPatch, apiPost, apiDelete } from "../services.js";
import { ArrayEditor } from "../components/ArrayEditor.js";
import { ObjectEditor } from "../components/ObjectEditor.js";

const API = "/api/admin/nav.php";

const data = await apiGet(API);

console.dir(data);

// Logo — object field, update only
ObjectEditor.mount({
  container: "#card-logo",
  label: "Logo",
  data: data.logo,
  fields: [
    { key: "src", label: "Image src" },
    { key: "alt", label: "Alt text" },
  ],
  onSave: (value) => apiPatch(API, "logo", value),
});

// Links — array field, full CRUD
ArrayEditor.mount({
  container: "#card-links",
  label: "Navigation Links",
  items: data.links,
  fields: [
    { key: "name", label: "Link text", placeholder: "e.g. About Us" },
    { key: "href", label: "URL", placeholder: "#about-us" },
  ],
  onSave: (index, value) => apiPatch(API, "links", value, index),
  onDelete: (index) => apiDelete(API, "links", index),
  onAdd: (item) => apiPost(API, "links", item),
});
