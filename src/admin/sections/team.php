<?php
// Go up two levels from /src/admin/sections/ to reach the root
require_once __DIR__ . '/../../../includes/function.php';
require_once __DIR__ . '/../../../config/database.php';
require_once __DIR__ . '/../../../includes/auth.php';

session_start();
requireLogin();

// Fix the Admin variable from the previous error
$admin = $_SESSION['admin_username'] ?? 'Admin'; 

// Now getPDO() will be recognized because database.php is correctly loaded
$pdo = getPDO();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit - Team Content</title>
    <link href="../../../src/css/output.css" rel="stylesheet">
</head>
<body class="bg-[#0d1117] text-[#e6edf3] font-sans antialiased min-h-screen">
<header class="bg-[#161b22] border-b border-[#30363d] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <h1 class="text-[1.1rem] font-bold text-white tracking-tight uppercase">BB 88 CMS</h1>
    <div class="text-[0.85rem] text-[#8b949e] flex items-center">
    <a href="/src/admin/index.php" class="hover:text-white transition-all flex items-center">
        <span class="mr-1.5 text-xs">←</span> Dashboard
    </a>
    <span class="mx-3 opacity-50">|</span>
    <span class="mr-3 text-[#8b949e]">Admin: <strong class="text-white font-semibold"><?= htmlspecialchars($admin) ?></strong></span>
    <span class="mx-3 opacity-50">|</span>
    <a href="/src/admin/logout.php" class="text-[#f85149] hover:underline transition-all font-medium">Log out</a>
</div>
</header>



<main class="max-w-215 mx-auto px-6 py-12">

    <header class="mb-10">
        <h1 class="text-2xl font-semibold tracking-tight">Edit: Our Team</h1>
        <p class="text-xs text-[#8b949e] mt-1">Update image sources, and team cards.</p>
    </header>

    <p class="text-[11px] uppercase tracking-[0.15em] text-[#8b949e] mb-4 font-bold">Team Cards (Read/Update)</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div id="card-team-0" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-1" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-2" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-3" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-4" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-5" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
        <div id="card-team-6" class="md:col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
            <div class="animate-pulse h-10 bg-[#21262d] rounded-md"></div>
        </div>
    </div>

</main>

<div id="toast" class="fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-medium border border-[#30363d] opacity-0 translate-y-4 pointer-events-none transition-all duration-300 z-9999"></div>

<script type="module" src="../../js/pages/team.js"></script>
</body>
</html>