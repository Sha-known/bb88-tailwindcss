<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';

session_start();
requireLogin();   // returns 401 JSON if not logged in

header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'nav';

// ─────────────────────────────────────────────────────────────────────
// Route by HTTP method
// ─────────────────────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ── GET ─────────────────────────────────────────────────────────
    // Returns the full section content + which fields are arrays.
    // The admin page JS calls this on load to populate the editor.
    case 'GET':
        $content = getSectionContent($pdo, $SECTION);

        // Inject _arrayFields so the JS knows which fields support CRUD
        $content['_arrayFields'] = getArrayFields($content);

        jsonResponse($content);


    // ── POST ────────────────────────────────────────────────────────
    // Add a new item to an array field.
    // Body: { "field": "links", "item": { "text": "…", "url": "…" } }
    case 'POST':
        $body    = getRequestBody();
        $field   = sanitize($body['field'] ?? '');
        $newItem = $body['item']  ?? null;

        if (empty($field) || $newItem === null) {
            jsonResponse(['error' => '"field" and "item" are required.'], 400);
        }

        $content = getSectionContent($pdo, $SECTION);

        // Guard: only allow adding to fields that are actual list arrays
        if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
            jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Create."], 422);
        }

        // Sanitize every string value in the incoming item
        $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $newItem);

        $content[$field][] = $clean;

        saveContent($pdo, $SECTION, $content);

        jsonResponse([
            'message' => 'Item added.',
            'field'   => $field,
            'items'   => $content[$field],  // return the updated array so JS can re-render
        ], 201);


    // ── PATCH ───────────────────────────────────────────────────────
    // Update a field. Two shapes:
    //   Object field → { "field": "logo",  "value": { "src": "…", "alt": "…" } }
    //   Array item   → { "field": "links", "index": 2, "value": { "text": "…", "url": "…" } }
    case 'PATCH':
        $body  = getRequestBody();
        $field = sanitize($body['field'] ?? '');
        $value = $body['value'] ?? null;

        if (empty($field) || $value === null) {
            jsonResponse(['error' => '"field" and "value" are required.'], 400);
        }

        $content = getSectionContent($pdo, $SECTION);

        if (!array_key_exists($field, $content)) {
            jsonResponse(['error' => "Field '{$field}' does not exist."], 404);
        }

        if (array_is_list($content[$field] ?? [])) {
            // ── Updating one item inside an array ──
            $index = $body['index'] ?? null;

            if ($index === null || !isset($content[$field][$index])) {
                jsonResponse(['error' => 'Valid "index" is required for array fields.'], 400);
            }

            $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
            $content[$field][(int)$index] = $clean;

        } else {
            // ── Updating an object field (logo, cta, title, etc.) ──
            if (is_array($value)) {
                $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
                $content[$field] = array_merge($content[$field], $clean);
            } else {
                $content[$field] = sanitize((string)$value);
            }
        }

        saveContent($pdo, $SECTION, $content);

        jsonResponse([
            'message' => 'Updated.',
            'field'   => $field,
            'value'   => $content[$field],
        ]);


    // ── DELETE ──────────────────────────────────────────────────────
    // Remove one item from an array field.
    // Query params: ?field=links&index=2
    case 'DELETE':
        $field = sanitize($_GET['field'] ?? '');
        $index = $_GET['index'] ?? null;

        if (empty($field) || $index === null) {
            jsonResponse(['error' => '"field" and "index" query params are required.'], 400);
        }

        $content = getSectionContent($pdo, $SECTION);

        // Guard: can only delete from list arrays
        if (!is_array($content[$field] ?? null) || !array_is_list($content[$field])) {
            jsonResponse(['error' => "'{$field}' is not an array field. Only array fields support Delete."], 422);
        }

        if (!isset($content[$field][(int)$index])) {
            jsonResponse(['error' => 'Index out of range.'], 404);
        }

        array_splice($content[$field], (int)$index, 1);  // removes & re-indexes

        saveContent($pdo, $SECTION, $content);

        jsonResponse([
            'message' => 'Item deleted.',
            'field'   => $field,
            'items'   => $content[$field],  // return the updated array so JS can re-render
        ]);


    default:
        jsonResponse(['error' => "Method '{$method}' not allowed."], 405);
}