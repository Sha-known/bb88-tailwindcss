import { showToast } from "../utilities.js";
import { escHtml } from "../utilities.js";

export const ArrayEditor = {
  /**
   * @param {object}   config
   * @param {string}   config.container   CSS selector for the card element
   * @param {string}   config.label       Display name (e.g. 'Navigation Links')
   * @param {Array}    config.items       Current array from the API
   * @param {Array}    config.fields      [{ key, label, placeholder? }]
   *                                      For scalar arrays (strings), pass:
   *                                      [{ key: null, label: 'Value', placeholder: '…' }]
   * @param {boolean}  [config.scalar]    true if items are plain strings, not objects
   * @param {Function} config.onSave      async (index, value) => void
   * @param {Function} config.onDelete    async (index) => { items }
   * @param {Function} config.onAdd       async (item)  => { items }
   */
  mount(config) {
    const el = document.querySelector(config.container);
    if (!el) return;

    // Store config on the element so re-renders can access it
    el._editorConfig = config;

    this._render(el, config.items);
  },

  _render(el, items) {
    const config = el._editorConfig;
    const { label, fields, scalar, onSave, onDelete, onAdd } = config;

    const rowsHtml =
      items
        .map((item, i) => {
          const inputsHtml = fields
            .map((f) => {
              const val = scalar ? item : (item[f.key] ?? "");
              return `
                    <input type="text"
                           data-key="${f.key ?? "_scalar"}"
                           value="${escHtml(val)}"
                           placeholder="${f.placeholder ?? ""}">
                `;
            })
            .join("");

          return `
                <div class="link-item" data-index="${i}">
                    ${inputsHtml}
                    <button class="btn btn-blue  btn-update">Save</button>
                    <button class="btn btn-ghost-red btn-delete">Delete</button>
                </div>
            `;
        })
        .join("") || `<p class="empty-note">No items yet.</p>`;

    const addInputsHtml = fields
      .map(
        (f) => `
            <div class="field">
                <label>${f.label}</label>
                <input type="text" class="add-input" data-key="${f.key ?? "_scalar"}"
                       placeholder="${f.placeholder ?? ""}">
            </div>
        `,
      )
      .join("");

    el.innerHTML = `
            <div class="card-header">
                <h2>${label}</h2>
                <span class="badge badge-crud">Full CRUD</span>
            </div>
            <div class="links-list">${rowsHtml}</div>
            <div class="add-row">
                ${addInputsHtml}
                <button class="btn btn-green btn-add">+ Add</button>
            </div>
        `;

    // ── SAVE (PATCH) ──────────────────────────────────────────
    el.querySelectorAll(".btn-update").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const row = e.currentTarget.closest(".link-item");
        const index = parseInt(row.dataset.index, 10);
        const value = this._collectValue(row, scalar);

        btn.disabled = true;
        btn.textContent = "…";

        try {
          await onSave(index, value);
          showToast("Saved!");
        } catch (err) {
          showToast(err.message, "error");
        } finally {
          btn.disabled = false;
          btn.textContent = "Save";
        }
      });
    });

    // ── DELETE ────────────────────────────────────────────────
    el.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        if (!confirm("Delete this item?")) return;

        const row = e.currentTarget.closest(".link-item");
        const index = parseInt(row.dataset.index, 10);
        btn.disabled = true;

        try {
          const res = await onDelete(index);
          showToast("Deleted.");
          this._render(el, res.items);
        } catch (err) {
          showToast(err.message, "error");
          btn.disabled = false;
        }
      });
    });

    // ── ADD (POST) ────────────────────────────────────────────
    el.querySelector(".btn-add").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      const item = this._collectValue(el.querySelector(".add-row"), scalar);

      // Guard: all fields must be filled
      const values = scalar ? [item] : Object.values(item);
      if (values.some((v) => !v)) {
        showToast("All fields are required.", "error");
        return;
      }

      btn.disabled = true;
      btn.textContent = "…";

      try {
        const res = await onAdd(item);
        showToast("Added!");
        this._render(el, res.items);
      } catch (err) {
        showToast(err.message, "error");
        btn.disabled = false;
        btn.textContent = "+ Add";
      }
    });
  },

  /** Reads all data-key inputs in a container into an object or scalar. */
  _collectValue(container, scalar) {
    const inputs = container.querySelectorAll("input[data-key]");

    if (scalar) {
      return inputs[0].value.trim();
    }

    const value = {};
    inputs.forEach((input) => {
      value[input.dataset.key] = input.value.trim();
    });
    return value;
  },
};
