
<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';

session_start();

$error   = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm  = $_POST['confirm']  ?? '';

    // ── Validation ──────────────────────────────────────────────
    if (empty($username) || empty($password)) {
        $error = 'All fields are required.';
    } elseif (strlen($password) < 8) {
        $error = 'Password must be at least 8 characters.';
    } elseif ($password !== $confirm) {
        $error = 'Passwords do not match.';
    } else {
        $pdo = getPDO();

        // Check username is not taken
        $stmt = $pdo->prepare('SELECT id FROM admins WHERE username = ?');
        $stmt->execute([$username]);

        if ($stmt->fetch()) {
            $error = 'That username is already taken.';
        } else {
            // password_hash() automatically salts + uses bcrypt
            $hash = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
            $stmt->execute([$username, $hash]);

            $success = 'Account created! <a href="/src/admin/login.php">Log in →</a>';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link href="../../src/css/output.css" rel="stylesheet">
</head>
<body class="bg-[#0d1117] text-[#e6edf3] flex items-center justify-center min-h-screen">
<div class="bg-[#161b22] border border-[#30363d] rounded-xl p-8 w-full max-w-sm">

    <h1 class="text-xl mb-6 text-center">📝 Register Admin Account</h1>

    <?php if ($error): ?>
        <div class="bg-red-500/10 border border-red-500 text-red-400 rounded-md p-2 text-sm mb-4">
            <?= $error ?>
        </div>
    <?php endif; ?>

    <?php if ($success): ?>
        <div class="bg-green-500/10 border border-green-500 text-green-400 rounded-md p-2 text-sm mb-4">
            <?= $success ?>
        </div>
    <?php endif; ?>

    <?php if (!$success): ?>
    <form method="POST">

        <label class="block text-sm mb-1 text-[#8b949e]">Username</label>
        <input
            type="text"
            name="username"
            required
            value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
            class="w-full mb-4 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] focus:outline-none focus:border-[#1e88e5]"
        >

        <label class="block text-sm mb-1 text-[#8b949e]">Password</label>
        <input
            type="password"
            name="password"
            required
            class="w-full mb-4 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] focus:outline-none focus:border-[#1e88e5]"
        >

        <label class="block text-sm mb-1 text-[#8b949e]">Confirm Password</label>
        <input
            type="password"
            name="confirm"
            required
            class="w-full mb-4 px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#e6edf3] focus:outline-none focus:border-[#1e88e5]"
        >

        <button
            type="submit"
            class="w-full py-2 bg-[#1e88e5] text-white rounded-md hover:bg-[#1a6aab]"
        >
            Create Account
        </button>

    </form>
    <?php endif; ?>

</div>
</body>
</html>
