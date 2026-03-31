<?php
require_once dirname(__DIR__) . '/../includes/function.php';
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';

session_start();
requireLogin();

$admin = $_SESSION['admin_username'];
$pdo   = getPDO();

// Fetch all sections so we can list them in the dashboard
$stmt     = $pdo->query('SELECT section, updated_at FROM page_sections ORDER BY section');
$sections = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard — MetaGames CMS</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui, sans-serif; background: #0d1117; color: #e6edf3; }
        header {
            background: #161b22;
            border-bottom: 1px solid #30363d;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 { font-size: 1.1rem; }
        .logout { color: #f85149; text-decoration: none; font-size: 0.85rem; }
        main { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem; }
        h2 { font-size: 1.3rem; margin-bottom: 1.2rem; color: #8b949e; font-weight: 500; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1rem;
        }
        .section-card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 1.2rem 1.4rem;
            text-decoration: none;
            color: inherit;
            transition: border-color 0.2s, transform 0.15s;
        }
        .section-card:hover { border-color: #1e88e5; transform: translateY(-2px); }
        .section-card .name {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.35rem;
            text-transform: capitalize;
        }
        .section-card .meta { font-size: 0.78rem; color: #8b949e; }
    </style>
</head>
<body>
<header>
    <h1>BB88 CMS</h1>
    <span style="font-size:.85rem; color:#8b949e;">
        Logged in as <strong><?= htmlspecialchars($admin) ?></strong> &nbsp;|&nbsp;
        <a class="logout" href="/src/admin/logout.php">Log out</a>
    </span>
</header>

<main>
    <h2>Page Sections</h2>
    <div class="grid">
        <?php foreach ($sections as $row): ?>
        <a class="section-card" href="/src/admin/sections/<?= $row['section'] ?>.php">
            <div class="name"><?= htmlspecialchars($row['section']) ?></div>
            <div class="meta">Updated: <?= $row['updated_at'] ?></div>
        </a>
        <?php endforeach; ?>
    </div>
</main>
</body>
</html>