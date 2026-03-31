<?php
require_once dirname(__DIR__) . '/../../includes/auth.php';
session_start();
requireLogin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Navbar</title>
    <link href="../../../src/css/output.css" rel="stylesheet">
</head>
<body class="bg-[#0d1117] text-[#e6edf3] font-sans antialiased">

<header class="bg-[#161b22] border-b border-[#30363d] px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <h1 class="text-sm font-medium">BB88 CMS</h1>
    <nav class="flex space-x-5 text-xs">
        <a href="/src/admin/index.php" class="text-[#8b949e] hover:text-[#e6edf3] transition-colors">← Dashboard</a>
        <a href="/src/admin/logout.php" class="text-[#f85149] hover:opacity-80 transition-opacity">Log out</a>
    </nav>
</header>

<main class="max-w-215 mx-auto px-6 py-12">

    <header class="mb-10">
        <h1 class="text-2xl font-semibold tracking-tight">Edit: Navbar</h1>
        <p class="text-xs text-[#8b949e] mt-1">Configure your site's main navigation and identity.</p>
    </header>

    <section class="mb-10">
        <p class="text-[10px] uppercase tracking-[0.2em] text-[#8b949e] mb-3 font-bold">Logo</p>
        
        <div id="card-logo" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 transition-all hover:border-[#444c56]">
            <div class="flex justify-between items-center mb-6">  
                <h2 class="text-sm font-semibold">Logo</h2>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#58a6ff] border border-blue-500/40 font-medium uppercase">
                    Read / Update
                </span>
            </div>

            <div class="animate-pulse space-y-3">
                <div class="h-9 bg-[#21262d] rounded-md w-full"></div>
                <div class="h-9 bg-[#21262d] rounded-md w-3/4"></div>
            </div>
        </div>
    </section>

    <section>
        <p class="text-[10px] uppercase tracking-[0.2em] text-[#8b949e] mb-3 font-bold">Navigation Links</p>

        <div id="card-links" class="bg-[#161b22] border border-[#30363d] rounded-xl p-6 transition-all hover:border-[#444c56]">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-sm font-semibold">Navigation Links</h2>
                <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-green-500/10 text-[#3fb950] border border-green-500/40 font-medium uppercase">
                    Full CRUD
                </span>
            </div>

            <div class="animate-pulse space-y-3">
                <div class="h-12 bg-[#21262d] rounded-md w-full"></div>
                <div class="h-12 bg-[#21262d] rounded-md w-full"></div>
            </div>
        </div>
    </section>

</main>

<div id="toast" class="fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-medium border border-[#30363d] opacity-0 translate-y-4 pointer-events-none transition-all duration-300 z-9999">
</div>

<script type="module" src="../../js/pages/nav.js"></script>
</body>
</html>