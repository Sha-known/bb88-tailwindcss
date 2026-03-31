<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';

session_start();

// Already logged in? Go straight to dashboard
if (isLoggedIn()) {
    header('Location: /src/admin/index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Username and password are required.';
    } else {
        $pdo  = getPDO();
        $stmt = $pdo->prepare(
            'SELECT id, username, password_hash FROM admins WHERE username = ?'
        );
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_id']       = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            header('Location: /src/admin/index.php');
            exit;
        }
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login — MetaGames CMS</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: system-ui, sans-serif;
            background: #0d1117;
            color: #e6edf3;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 2rem;
            width: 100%;
            max-width: 380px;
        }
        h1 { font-size: 1.4rem; margin-bottom: 1.5rem; text-align: center; }
        label { display: block; font-size: 0.85rem; margin-bottom: 4px; color: #8b949e; }
        input {
            width: 100%;
            padding: 0.6rem 0.8rem;
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 6px;
            color: #e6edf3;
            font-size: 0.95rem;
            margin-bottom: 1rem;
        }
        input:focus { outline: none; border-color: #1e88e5; }
        .btn {
            width: 100%;
            padding: 0.65rem;
            background: #1e88e5;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
        }
        .btn:hover { background: #1a6aab; }
        .error {
            background: rgba(248, 81, 73, 0.1);
            border: 1px solid #f85149;
            border-radius: 6px;
            padding: 0.6rem 0.8rem;
            font-size: 0.85rem;
            color: #f85149;
            margin-bottom: 1rem;
        }
        .sub { text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #8b949e; }
        .sub a { color: #1e88e5; text-decoration: none; }
    </style>
</head>
<body>
<div class="card">
    <h1>🛡️ Admin Login</h1>

    <?php if ($error): ?>
        <div class="error"><?= $error ?></div>
    <?php endif; ?>

    <form method="POST">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            name="username"
            required
            autocomplete="username"
            value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
        >

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required autocomplete="current-password">

        <button class="btn" type="submit">Log In</button>
    </form>

    <p class="sub"><a href="/src/admin/register.php">Create an admin account →</a></p>
</div>
</body>
</html>