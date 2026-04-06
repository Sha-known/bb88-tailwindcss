<?php
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';
require_once dirname(__DIR__) . '/../config/database.php';

session_start();
requireLogin();


error_reporting(0); 
header('Content-Type: application/json');

$pdo     = getPDO();
$SECTION = 'contact';
$method  = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $content = getSectionContent($pdo, $SECTION);
        jsonResponse($content);
        break; 

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
        foreach ($keys as $key) { $target = &$target[$key]; }

        $target[] = $newItem; // Huwag i-sanitize ang buong array kung JSON ang loob
        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Item added.', 'items' => $target], 201);
        break; 

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
            $target[(int)$index] = $value;
        } else {
            $target = $value;
        }

        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Updated', 'value' => $target]);
        break; 

    case 'DELETE':
        $field = sanitize($_GET['field'] ?? '');
        $index = $_GET['index'] ?? null;

        $content = getSectionContent($pdo, $SECTION);
        $keys   = explode('.', $field);
        $target = &$content;
        foreach ($keys as $key) { $target = &$target[$key]; }

        array_splice($target, (int)$index, 1);
        saveContent($pdo, $SECTION, $content);
        jsonResponse(['message' => 'Deleted', 'items' => $target]);
        break; 

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}