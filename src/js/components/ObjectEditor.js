import { showToast } from "../utilities.js";
import { escHtml } from "../utilities.js";

export const ObjectEditor = {
  /**
   * @param {object} config
   * @param {string}   config.container  CSS selector for the card element
   * @param {string}   config.label      Display name (e.g. 'Logo')
   * @param {object}   config.data       Current field value from the API
   * @param {Array}    config.fields     [{ key, label, placeholder? }]
   * @param {Function} config.onSave     async (value) => void
   */
  mount({ container, label, data, fields, onSave }) {
    const el = document.querySelector(container);
    if (!el) return;

    const inputsHtml = fields
      .map(
        (f) => `
            <div class="field">
                <label>${f.label}</label>
                <input type="text"
                       data-key="${f.key}"
                       value="${escHtml(data[f.key] ?? "")}"
                       placeholder="${f.placeholder ?? ""}">
            </div>
        `,
      )
      .join("");

    el.innerHTML = `
            <div class="card-header">
                <h2>${label}</h2>
                <span class="badge badge-update">Read / Update</span>
            </div>
            ${inputsHtml}
            <button class="btn btn-blue btn-save">Save ${label}</button>
        `;

    el.querySelector(".btn-save").addEventListener("click", async (e) => {
      const btn = e.currentTarget;
      btn.disabled = true;
      btn.textContent = "Saving…";

      // Collect values from all inputs back into an object
      const value = {};
      el.querySelectorAll("input[data-key]").forEach((input) => {
        value[input.dataset.key] = input.value.trim();
      });

      try {
        await onSave(value);
        showToast(`${label} saved!`);
      } catch (err) {
        showToast(err.message, "error");
      } finally {
        btn.disabled = false;
        btn.textContent = `Save ${label}`;
      }
    });
  },
};
