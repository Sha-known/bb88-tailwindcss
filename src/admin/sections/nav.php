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
<style>
/* 1. CONTAINER & HEADER */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e6edf3;
}

/* 2. BADGE SYSTEM */
.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  text-transform: capitalize;
}

.badge-update {
  background: rgba(30, 136, 229, 0.1);
  color: #58a6ff;
  border: 1px solid rgba(30, 136, 229, 0.4);
}

.badge-crud, .badge-success {
  background: rgba(63, 185, 80, 0.1);
  color: #3fb950;
  border: 1px solid rgba(63, 185, 80, 0.4);
}

/* 3. FORM FIELDS */
.field {
  margin-bottom: 16px;
}

.field label {
  display: block;
  font-size: 12px;
  color: #8b949e;
  margin-bottom: 6px;
  font-weight: 500;
}

.field input, .link-item input {
  width: 100%;
  padding: 8px 12px;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #e6edf3;
  outline: none;
  transition: border-color 0.2s;
}

.field input:focus, .link-item input:focus {
  border-color: #1e88e5;
  box-shadow: 0 0 0 1px #1e88e5;
}

/* 4. ARRAY EDITOR / LINK ITEMS - FIXED ALIGNMENT */
.link-item {
  display: grid;
  grid-template-columns: 1fr 1fr 80px 80px; /* Fixed width for buttons to align */
  gap: 10px;
  margin-bottom: 12px;
  align-items: center;
}

/* 5. BUTTONS */
.btn {
  height: 36px; /* Consistent height for alignment */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.btn-blue, .btn-save {
  background: #1f6feb;
  color: white;
}
.btn-blue:hover { background: #388bfd; }

.btn-green, .btn-add {
  background: #238636;
  color: white;
  padding: 0 15px;
}
.btn-green:hover { background: #2ea043; }

.btn-ghost-red, .btn-delete {
  background: transparent;
  border: 1px solid #f85149;
  color: #f85149;
}
.btn-ghost-red:hover { background: rgba(248, 81, 73, 0.1); }

/* 6. TOAST SYSTEM FIX (Targeting the .show class from your JS) */
#toast.show {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  border: 1px solid #30363d;
  animation: slideUp 0.3s ease-out forwards;
}

#toast.success {
  background: #161b22;
  color: #3fb950;
  border-color: rgba(63, 185, 80, 0.4);
}

#toast.error {
  background: #381a1a;
  color: #ff7b72;
  border-color: #f85149;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Add Row Section */
.add-row {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #30363d;
}
</style>
</head>
<body class="bg-[#0d1117] text-[#e6edf3]">

<header class="bg-[#161b22] border-b border-[#30363d] px-8 py-4 flex justify-between items-center">
    <h1 class="text-sm">🎮 MetaGames CMS</h1>

    <nav class="space-x-5 text-xs">
        <a href="/src/admin/index.php" class="text-[#8b949e] hover:text-[#e6edf3]">← Dashboard</a>
        <a href="/src/admin/logout.php" class="text-[#f85149] hover:opacity-80">Log out</a>
    </nav>
</header>

<main class="max-w-[860px] mx-auto px-6 py-8">

    <h1 class="text-2xl">Edit: Navbar</h1>

    <!-- LOGO -->
    <p class="text-[11px] uppercase tracking-widest text-[#8b949e] mt-8 mb-3 font-bold">
        Logo
    </p>

    <div id="card-logo"
         class="bg-[#161b22] border border-[#30363d] rounded-[10px] p-6 mb-4">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-base">Logo</h2>

            <span class="text-[11px] px-2 py-[2px] rounded-full bg-[#1f2d3d] text-[#58a6ff] border border-[#1e88e5]">
                Read / Update
            </span>
        </div>

        <!-- JS injects fields HERE -->
        <div class="animate-pulse h-9 bg-[#21262d] rounded"></div>
    </div>

    <!-- LINKS -->
    <p class="text-[11px] uppercase tracking-widest text-[#8b949e] mt-8 mb-3 font-bold">
        Navigation Links
    </p>

    <div id="card-links"
         class="bg-[#161b22] border border-[#30363d] rounded-[10px] p-6">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-base">Navigation Links</h2>

            <span class="text-[11px] px-2 py-[2px] rounded-full bg-[#1f3d29] text-[#3fb950] border border-[#3fb950]">
                Full CRUD
            </span>
        </div>

        <!-- JS injects array editor HERE -->
        <div class="animate-pulse h-9 bg-[#21262d] rounded"></div>
    </div>

</main>

<!-- Toast -->
<div id="toast"
     class="fixed bottom-6 right-6 px-5 py-3 rounded-lg text-sm font-medium opacity-0 translate-y-4 pointer-events-none transition-all duration-300 z-[9999]">
</div>

<script type="module" src="../../js/pages/nav.js"></script>
</body>
</html>