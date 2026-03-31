<?php
require_once dirname(__DIR__) . '/../../includes/auth.php';
session_start();
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Navbar — MetaGames CMS</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: system-ui, sans-serif;
            background: #0d1117;
            color: #e6edf3;
        }

        /* ── Layout ── */
        header {
            background: #161b22;
            border-bottom: 1px solid #30363d;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 { font-size: 1rem; }
        .nav-links a {
            color: #8b949e;
            text-decoration: none;
            font-size: 0.85rem;
            margin-left: 1.2rem;
        }
        .nav-links a:hover { color: #e6edf3; }
        .nav-links a.danger { color: #f85149; }

        main {
            max-width: 860px;
            margin: 2rem auto;
            padding: 0 1.5rem 4rem;
        }

        .page-title { font-size: 1.5rem; }
        .page-meta  { font-size: 0.8rem; color: #8b949e; margin-top: 0.25rem; }

        /* ── Toast notification ── */
        #toast {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            padding: 0.7rem 1.2rem;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 500;
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 0.25s, transform 0.25s;
            pointer-events: none;
            z-index: 9999;
        }
        #toast.show   { opacity: 1; transform: translateY(0); }
        #toast.success { background: #1f3d29; color: #3fb950; border: 1px solid #3fb950; }
        #toast.error   { background: rgba(248,81,73,.15); color: #f85149; border: 1px solid #f85149; }

        /* ── Section divider ── */
        .section-title {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #8b949e;
            margin: 2rem 0 0.75rem;
        }

        /* ── Cards ── */
        .card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 1.4rem 1.6rem;
            margin-bottom: 1rem;
        }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.1rem;
        }
        .card-header h2 { font-size: 1rem; }

        .badge {
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            padding: 2px 9px;
            border-radius: 20px;
        }
        .badge-update { background: #1f2d3d; color: #58a6ff; border: 1px solid #1e88e5; }
        .badge-crud   { background: #1f3d29; color: #3fb950; border: 1px solid #3fb950; }

        /* ── Fields ── */
        .field { margin-bottom: 0.85rem; }
        .field:last-child { margin-bottom: 0; }
        label { display: block; font-size: 0.78rem; color: #8b949e; margin-bottom: 3px; }
        input[type="text"] {
            width: 100%;
            padding: 0.5rem 0.7rem;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
            color: #e6edf3;
            font-size: 0.88rem;
        }
        input[type="text"]:focus { outline: none; border-color: #1e88e5; }

        /* ── Buttons ── */
        .btn {
            padding: 0.45rem 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.82rem;
            font-weight: 500;
            transition: background 0.15s, opacity 0.15s;
        }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-blue  { background: #1e88e5; color: #fff; }
        .btn-blue:hover:not(:disabled) { background: #1a6aab; }
        .btn-green { background: #238636; color: #fff; }
        .btn-green:hover:not(:disabled) { background: #1a6929; }
        .btn-ghost-red {
            background: transparent;
            color: #f85149;
            border: 1px solid #f85149;
        }
        .btn-ghost-red:hover:not(:disabled) { background: rgba(248,81,73,.12); }

        /* ── Links list ── */
        .links-list { display: flex; flex-direction: column; gap: 0.5rem; }

        .link-item {
            display: grid;
            grid-template-columns: 1fr 1fr auto auto;
            gap: 0.5rem;
            align-items: center;
            padding: 0.6rem 0;
            border-bottom: 1px solid #21262d;
        }
        .link-item:last-child { border-bottom: none; }

        .add-row {
            display: grid;
            grid-template-columns: 1fr 1fr auto;
            gap: 0.5rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px dashed #30363d;
            align-items: end;
        }
        .add-row .field { margin-bottom: 0; }

        /* ── Skeleton loader ── */
        .skeleton {
            background: linear-gradient(90deg, #21262d 25%, #30363d 50%, #21262d 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            border-radius: 6px;
            height: 36px;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
    </style>
</head>
<body>

<header>
    <h1>🎮 MetaGames CMS</h1>
    <nav class="nav-links">
        <a href="/src/admin/index.php">← Dashboard</a>
        <a href="/src/admin/logout.php" class="danger">Log out</a>
    </nav>
</header>

<main>
    <h1 class="page-title">Edit: Navbar</h1>

    <!-- ── LOGO (object → update only) ─────────────────────── -->
    <p class="section-title">Logo</p>
    <div class="card" id="card-logo">
        <div class="card-header">
            <h2>Logo</h2>
            <span class="badge badge-update">Read / Update</span>
        </div>
        <!-- Populated by JS -->
        <div class="skeleton"></div>
    </div>

    <!-- ── LINKS (array → full CRUD) ────────────────────────── -->
    <p class="section-title">Navigation Links</p>
    <div class="card" id="card-links">
        <div class="card-header">
            <h2>Navigation Links</h2>
            <span class="badge badge-crud">Full CRUD</span>
        </div>
        <div class="skeleton"></div>
    </div>
</main>

<!-- Toast -->
<div id="toast"></div>

<script type="module" src="../../js/pages/nav.js"></script>
</body>
</html>