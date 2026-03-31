
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
    <title>Register — MetaGames CMS</title>
    <style>
        /* (same styles as login.php — in production, extract to admin.css) */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui, sans-serif; background: #0d1117; color: #e6edf3; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 2rem; width: 100%; max-width: 380px; }
        h1 { font-size: 1.4rem; margin-bottom: 1.5rem; text-align: center; }
        label { display: block; font-size: 0.85rem; margin-bottom: 4px; color: #8b949e; }
        input { width: 100%; padding: 0.6rem 0.8rem; background: #0d1117; border: 1px solid #30363d; border-radius: 6px; color: #e6edf3; font-size: 0.95rem; margin-bottom: 1rem; }
        input:focus { outline: none; border-color: #1e88e5; }
        .btn { width: 100%; padding: 0.65rem; background: #1e88e5; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
        .btn:hover { background: #1a6aab; }
        .error { background: rgba(248,81,73,.1); border: 1px solid #f85149; border-radius: 6px; padding: .6rem .8rem; font-size: .85rem; color: #f85149; margin-bottom: 1rem; }
        .success { background: rgba(63,185,80,.1); border: 1px solid #3fb950; border-radius: 6px; padding: .6rem .8rem; font-size: .85rem; color: #3fb950; margin-bottom: 1rem; }
        .sub { text-align: center; margin-top: 1rem; font-size: .85rem; color: #8b949e; }
        .sub a { color: #1e88e5; text-decoration: none; }
    </style>
</head>
<body>
<div class="card">
    <h1>📝 Create Admin</h1>

    <?php if ($error):   ?><div class="error"><?= $error ?></div><?php endif; ?>
    <?php if ($success): ?><div class="success"><?= $success ?></div><?php endif; ?>

    <?php if (!$success): ?>
    <form method="POST">
        <label>Username</label>
        <input type="text" name="username" required value="<?= htmlspecialchars($_POST['username'] ?? '') ?>">

        <label>Password</label>
        <input type="password" name="password" required>

        <label>Confirm Password</label>
        <input type="password" name="confirm" required>

        <button class="btn" type="submit">Create Account</button>
    </form>
    <?php endif; ?>
</div>
</body>
</html>
