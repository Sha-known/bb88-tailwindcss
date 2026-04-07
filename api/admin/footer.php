<?php
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';
require_once dirname(__DIR__) . '/../config/database.php';

session_start();
requireLogin();

header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'footer';
$method  = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $content = getSectionContent($pdo, $SECTION);
        $content['_arrayFields'] = getArrayFields($content);
        jsonResponse($content);

    case 'POST':
        $body    = getRequestBody();
        $field   = sanitize($body['field'] ?? '');
        $newItem = $body['item']  ?? null;

        if (empty($field) || $newItem === null) {
            jsonResponse(['error' => 'Field and item required.'], 400);
        }

        $content = getSectionContent($pdo, $SECTION);

        $keys   = explode('.', $field);
        $target = &$content;
        foreach ($keys as $key) {
            $target = &$target[$key];
        }

        if (!is_array($target)) {
            jsonResponse(['error' => "Target '{$field}' is not a list."], 422);
        }

        $clean = is_array($newItem)
            ? array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $newItem)
            : sanitize($newItem);

        $target[] = $clean;
        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Item added.', 'items' => $target], 201);

    case 'PATCH':
        $body  = getRequestBody();
        $field = sanitize($body['field'] ?? '');
        $value = $body['value'] ?? null;
        $index = $body['index'] ?? null;

        $content = getSectionContent($pdo, $SECTION);

        $keys   = explode('.', $field);
        $target = &$content;
        foreach ($keys as $key) {
            if (!isset($target[$key])) jsonResponse(['error' => 'Field not found'], 404);
            $target = &$target[$key];
        }

        if ($index !== null) {
            $clean = is_array($value)
                ? array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value)
                : sanitize($value);
            $target[(int)$index] = $clean;
        } else {
            if (is_array($value)) {
                $clean = array_map(fn($v) => is_string($v) ? sanitize($v) : $v, $value);
                $target = array_merge((array)$target, $clean);
            } else {
                $target = sanitize((string)$value);
            }
        }

        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Updated', 'value' => $target]);

    case 'DELETE':
        $field = sanitize($_GET['field'] ?? '');
        $index = $_GET['index'] ?? null;

        $content = getSectionContent($pdo, $SECTION);

        $keys   = explode('.', $field);
        $target = &$content;
        foreach ($keys as $key) {
            $target = &$target[$key];
        }

        if (!isset($target[(int)$index])) jsonResponse(['error' => 'Not found'], 404);

        array_splice($target, (int)$index, 1);
        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Deleted', 'items' => $target]);

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}