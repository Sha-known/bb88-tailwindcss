/**
 * GET
 * Retrieves all the data from the API.
 */
export async function apiGet(API) {
  const res = await fetch(API);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}

/**
 * PATCH
 * Updates an object field or a single item inside an array field.
 */
export async function apiPatch(API, field, value, index = null) {
  const body = { field, value };
  if (index !== null) body.index = index;

  const res = await fetch(API, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}

/**
 * POST
 * Adds a new item to an array field.
 */
export async function apiPost(API, field, item) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field, item }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}

/**
 * DELETE
 * Removes one item from an array field.
 */
export async function apiDelete(API, field, index) {
  const res = await fetch(`${API}?field=${field}&index=${index}`, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
  return json;
}
