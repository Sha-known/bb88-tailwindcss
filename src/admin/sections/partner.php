<?php
require_once dirname(__DIR__) . '/../../includes/auth.php';
session_start();
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit - Partner Companies</title>
    <link href="../../../src/css/output.css" rel="stylesheet">
</head>
<body class="bg-[#0d1117] text-[#e6edf3] font-sans">

<header class="bg-[#161b22] border-b border-[#30363d] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <h1 class="text-sm font-medium">BB88 CMS</h1>
    <nav class="flex space-x-5 text-xs">
        <a href="/src/admin/index.php" class="text-[#8b949e] hover:text-[#e6edf3] transition-colors">← Dashboard</a>
        <a href="/src/admin/logout.php" class="text-[#f85149] hover:opacity-80 transition-opacity">Log out</a>
    </nav>
</header>

<main class="max-w-215 mx-auto px-6 py-12">

    <header class="mb-10">
        <h1 class="text-2xl font-semibold tracking-tight">Edit: Partner Companies</h1>
        <p class="text-xs text-[#8b949e] mt-1">Add, update, or remove partner company logos and links.</p>
    </header>

    <p class="text-[11px] uppercase tracking-[0.15em] text-[#8b949e] mb-4 font-bold">Partner Logos (Full CRUD)</p>

    <div id="card-logos" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#444c56] transition-all">
        <div class="animate-pulse space-y-3">
            <div class="h-10 bg-[#21262d] rounded-md"></div>
            <div class="h-10 bg-[#21262d] rounded-md"></div>
            <div class="h-10 bg-[#21262d] rounded-md"></div>
        </div>
    </div>

</main>

<div id="toast" class="fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-medium border border-[#30363d] opacity-0 translate-y-4 pointer-events-none transition-all duration-300 z-9999"></div>

<script type="module" src="../../js/pages/partner.js"></script>
</body>
</html>