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
    <title>Dashboard — BB88 CMS</title>
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
<body class="bg-[#0d1117] text-[#e6edf3] font-sans antialiased min-h-screen">
<header class="bg-[#161b22] border-b border-[#30363d] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <h1 class="text-[1.1rem] font-bold text-white tracking-tight">BB 88 CMS</h1>
    <div class="text-[0.85rem] text-[#8b949e]">
        <span>Logged in as <strong class="text-white font-semibold"><?= htmlspecialchars($admin) ?></strong></span>
        <span class="mx-3 opacity-50">|</span>
        <a href="/src/admin/logout.php" class="text-[#f85149] hover:underline transition-all font-medium">Log out</a>
    </div>
</header>

<main class="max-w-7xl mx-auto px-10 py-16 bg-[#0d1117] min-h-screen">
    <header class="mb-12">
        <h1 class="text-4xl font-bold text-white mb-2">Page Sections</h1>
        <p class="text-xs uppercase tracking-widest text-[#8b949e] font-semibold">
            MANAGEMENT CONSOLE: Configure all primary site modules.
        </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    <?php
    $sections = [
        ['name' => 'Home', 'time' => '2026-03-31 10:12:04', 'icon' => 'https://img.icons8.com/?size=100&id=73&format=png&color=FFFFFF', 'color' => 'from-amber-400 to-orange-500'],
        ['name' => 'Nav', 'time' => '2026-04-01 11:55:19', 'icon' => 'https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF', 'color' => 'from-sky-400 to-blue-600'],
        ['name' => 'Portfolio', 'time' => '2026-04-31 10:19:03', 'icon' => 'https://img.icons8.com/?size=100&id=111593&format=png&color=FFFFFF', 'color' => 'from-fuchsia-500 to-purple-600'],
        ['name' => 'Services', 'time' => '2026-03-31 10:19:03', 'icon' => 'https://img.icons8.com/?size=100&id=59992&format=png&color=FFFFFF', 'color' => 'from-emerald-400 to-teal-500'],
        ['name' => 'Posts', 'time' => '2026-04-01 11:03:07', 'icon' => 'https://img.icons8.com/?size=100&id=40571&format=png&color=FFFFFF', 'color' => 'from-rose-500 to-red-600'],
        ['name' => 'Contact', 'time' => '2026-03-31 10:12:56', 'icon' => 'https://img.icons8.com/?size=100&id=9659&format=png&color=FFFFFF', 'color' => 'from-indigo-500 to-violet-600'],
        ['name' => 'Team', 'time' => '2026-04-01 09:48:16', 'icon' => 'https://img.icons8.com/?size=100&id=40390&format=png&color=FFFFFF', 'color' => 'from-cyan-400 to-blue-500'],
        ['name' => 'Partner', 'time' => '2026-04-01 10:19:03', 'icon' => 'https://img.icons8.com/?size=100&id=10993&format=png&color=FFFFFF', 'color' => 'from-lime-400 to-green-500'],
        ['name' => 'Footer', 'time' => '2026-03-31 10:19:03', 'icon' => 'https://img.icons8.com/?size=100&id=44469&format=png&color=FFFFFF', 'color' => 'from-slate-400 to-slate-600'],
    ];

    // Color map remains the same to drive the hover border
    $colorMap = [
        'amber-400'   => 'rgba(251, 191, 36, 0.5)',
        'sky-400'     => 'rgba(56, 189, 248, 0.5)',
        'fuchsia-500' => 'rgba(217, 70, 239, 0.5)',
        'emerald-400' => 'rgba(52, 211, 153, 0.5)',
        'rose-500'    => 'rgba(244, 63, 94, 0.5)',
        'indigo-500'  => 'rgba(99, 102, 241, 0.5)',
        'cyan-400'    => 'rgba(34, 211, 238, 0.5)',
        'lime-400'    => 'rgba(163, 230, 53, 0.5)',
        'slate-400'   => 'rgba(148, 163, 184, 0.5)',
    ];
    ?>

    <?php foreach ($sections as $s): 
        $baseKey = str_replace('from-', '', explode(' ', $s['color'])[0]);
        $resolvedColor = $colorMap[$baseKey] ?? 'rgba(255, 255, 255, 0.2)';
    ?>
        <div class="relative group">
            <div class="absolute -top-4 right-7 w-12 h-12 rounded-lg bg-linear-to-br <?= $s['color'] ?> flex items-center justify-center shadow-lg z-10 border border-white/10 transition-transform group-hover:scale-110">
                <img src="<?= $s['icon'] ?>" alt="<?= $s['name'] ?>" class="w-6 h-6 object-contain">
            </div>

            <a href="sections/<?= strtolower($s['name']) ?>.php" style="--hover-border: <?= $resolvedColor ?>;" class="block bg-[#161b22] border border-[#30363d] rounded-2xl p-8 transition-all duration-300 hover:bg-[#1c2128] hover:-translate-y-1 hover:border-(--hover-border) hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                <h3 class="text-2xl font-bold text-white mb-2"><?= $s['name'] ?></h3>
                <p class="text-[11px] text-[#8b949e]">Updated: <?= $s['time'] ?></p>
            </a>
        </div>
    <?php endforeach; ?>
    </div>
</main>
</body>
</html>