<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';

session_start();

if (isLoggedIn()) {
    header('Location: /src/admin/index.php');
    exit;
}

$error = '';
$success = '';
$mode = $_GET['mode'] ?? 'login'; // Determine which side to show on load

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $pdo = getPDO();

    // --- LOGIN LOGIC ---
    if ($action === 'login') {
        $username = sanitize($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';

        $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ?');
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            header('Location: /src/admin/index.php');
            exit;
        }
        $error = 'Invalid username or password.';
        $mode = 'login';
    } 
    
    // --- REGISTER LOGIC ---
    elseif ($action === 'register') {
        $username = sanitize($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirm  = $_POST['confirm'] ?? '';

        if (strlen($password) < 8) {
            $error = 'Password must be at least 8 characters.';
        } elseif ($password !== $confirm) {
            $error = 'Passwords do not match.';
        } else {
            $stmt = $pdo->prepare('SELECT id FROM admins WHERE username = ?');
            $stmt->execute([$username]);
            if ($stmt->fetch()) {
                $error = 'Username already taken.';
            } else {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
                $stmt->execute([$username, $hash]);
                $success = 'Account created! You can now sign in.';
                $mode = 'login'; // Slide back to login on success
            }
        }
        if ($error) $mode = 'register';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MetaGames Admin — Auth</title>
    <link href="../../src/css/output.css" rel="stylesheet">
    <style>
        .container.right-panel-active .sign-in-container { transform: translateX(100%); }
        .container.right-panel-active .sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s; }
        .container.right-panel-active .overlay-container { transform: translateX(-100%); }
        .container.right-panel-active .overlay { transform: translateX(50%); }
        .container.right-panel-active .overlay-left { transform: translateX(0); }
        .container.right-panel-active .overlay-right { transform: translateX(20%); }
        @keyframes show { 0%, 49.99% { opacity: 0; z-index: 1; } 50%, 100% { opacity: 1; z-index: 5; } }
    </style>
</head>
<body class="bg-[#0d1117] text-[#e6edf3] flex items-center justify-center min-h-screen font-sans">

<div class="container relative overflow-hidden w-3xl max-w-full min-h-130 bg-[#161b22] rounded-2xl shadow-2xl border border-[#30363d] <?= $mode === 'register' ? 'right-panel-active' : '' ?>" id="container">
    
    <div class="form-container sign-up-container absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out opacity-0 z-1">
        <form method="POST" class="bg-[#161b22] flex flex-col items-center justify-center p-12 h-full text-center">
            <h1 class="text-2xl font-bold mb-4">Create Account</h1>
            <?php if ($error && $mode === 'register'): ?> <div class="text-red-400 text-xs mb-2"><?= $error ?></div> <?php endif; ?>
            <input type="hidden" name="action" value="register">
            <input type="text" name="username" placeholder="Username" required class="w-full mb-3 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <input type="password" name="password" placeholder="Password" required class="w-full mb-3 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <input type="password" name="confirm" placeholder="Confirm Password" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <button class="bg-green-700 hover:bg-green-600 text-white px-10 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all">Sign Up</button>
        </form>
    </div>

    <div class="form-container sign-in-container absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out z-2">
        <form method="POST" class="bg-[#161b22] flex flex-col items-center justify-center p-12 h-full text-center">
            <h1 class="text-2xl font-bold mb-4">Sign In</h1>
            <?php if ($error && $mode === 'login'): ?> <div class="text-red-400 text-xs mb-2"><?= $error ?></div> <?php endif; ?>
            <?php if ($success): ?> <div class="text-green-400 text-xs mb-2"><?= $success ?></div> <?php endif; ?>
            <input type="hidden" name="action" value="login">
            <input type="text" name="username" placeholder="Username" required class="w-full mb-3 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-[#1e88e5] outline-none transition-colors" />
            <input type="password" name="password" placeholder="Password" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-[#1e88e5] outline-none transition-colors" />
            <button class="bg-green-700 hover:bg-green-600 text-white px-10 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all">Log In</button>
        </form>
    </div>

    <div class="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100">
        <div class="overlay bg-linear-to-r from-green-light to-[#48887B] text-white relative -left-full h-full w-[200%] transition-transform duration-700 ease-in-out">
            <div class="overlay-panel overlay-left absolute flex flex-col items-center justify-center p-10 text-center top-0 h-full w-1/2 transition-transform duration-700 left-0 translate-x-0">
                <h1 class="text-2xl font-bold mb-4">Welcome Back!</h1>
                <p class="text-sm mb-6 px-4">Already have an admin account? Sign in here.</p>
                <button class="px-10 py-2 rounded-full border border-white bg-transparent text-white font-bold uppercase text-xs tracking-wider hover:bg-white hover:text-[#161b22] transition-all" id="signIn">Sign In</button>
            </div>

            <div class="overlay-panel overlay-right absolute flex flex-col items-center justify-center p-10 text-center top-0 h-full w-1/2 right-0 translate-x-0 transition-transform duration-700">
                <h1 class="text-2xl font-bold mb-4">Hello, Admin!</h1>
                <p class="text-sm mb-6 px-4">Enter your details and start another admin account!</p>
                <button class="px-10 py-2 rounded-full border border-white bg-transparent text-white font-bold uppercase text-xs tracking-wider hover:bg-white hover:text-[#161b22] transition-all" id="signUp">Sign Up</button>
            </div>
        </div>
    </div>
</div>

<script>
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
    signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));
</script>
</body>
</html>