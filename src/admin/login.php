<?php
require_once dirname(__DIR__) . '/../config/database.php';
require_once dirname(__DIR__) . '/../includes/auth.php';
require_once dirname(__DIR__) . '/../includes/function.php';

session_start();

// If already logged in, redirect immediately
if (isLoggedIn() && !isset($_GET['api'])) {
    header('Location: /src/admin/index.php');
    exit;
}

// --- API HANDLER ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $pdo = getPDO();
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';

    if ($action === 'login') {
        $username = sanitize($data['username'] ?? '');
        $password = $data['password'] ?? '';

        $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ?');
        $stmt->execute([$username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            echo json_encode(['success' => true, 'redirect' => '/src/admin/index.php']);
            exit;
        }
        echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
        exit;
    }

    if ($action === 'register') {
        $username = sanitize($data['username'] ?? '');
        $password = $data['password'] ?? '';
        $confirm  = $data['confirm'] ?? '';

        if (strlen($password) < 8) {
            echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters.']);
        } elseif ($password !== $confirm) {
            echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        } else {
            $stmt = $pdo->prepare('SELECT id FROM admins WHERE username = ?');
            $stmt->execute([$username]);
            if ($stmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'Username already taken.']);
            } else {
                $hash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)');
                $stmt->execute([$username, $hash]);
                echo json_encode(['success' => true, 'message' => 'Account created! Logging you in...']);
            }
        }
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BB 88 Admin — Auth</title>
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
        <form id="registerForm" class="bg-[#161b22] flex flex-col items-center justify-center p-12 h-full text-center">
            <h1 class="text-2xl font-bold mb-4 text-white">Create Account</h1>
            <div id="registerError" class="text-red-400 text-xs mb-2 hidden"></div>
            <input type="text" id="regUsername" placeholder="Username" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <input type="password" id="regPassword" placeholder="Password" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <input type="password" id="regConfirm" placeholder="Confirm Password" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <button type="submit"  class="bg-green-700 hover:bg-green-600 text-white px-10 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all">Sign Up</button>
        </form>
    </div>

    <div class="form-container sign-in-container absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out z-2">
        <form id="loginForm" class="bg-[#161b22] flex flex-col items-center justify-center p-12 h-full text-center">
            <h1 class="text-2xl font-bold mb-4 text-white">Sign In</h1>
            <div id="loginError" class="text-red-400 text-xs mb-2 hidden"></div>
            <div id="loginSuccess" class="text-green-400 text-xs mb-2 hidden"></div>
            <input type="text" id="loginUsername" placeholder="Username" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <input type="password" id="loginPassword" placeholder="Password" required class="w-full mb-5 px-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md focus:border-green-500 outline-none transition-colors" />
            <button type="submit" class="bg-green-700 hover:bg-green-600 text-white px-10 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all">Log In</button>
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
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');

    // Panel Switching
    signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
    signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));

    async function handleAuth(e, action) {
        e.preventDefault();
        const errorDiv = document.getElementById(`${action}Error`);
        const successDiv = document.getElementById('loginSuccess');
        
        // Gather data
        const body = { action };
        if (action === 'login') {
            body.username = document.getElementById('loginUsername').value;
            body.password = document.getElementById('loginPassword').value;
        } else {
            body.username = document.getElementById('regUsername').value;
            body.password = document.getElementById('regPassword').value;
            body.confirm = document.getElementById('regConfirm').value;
        }

        try {
            const res = await fetch(window.location.href, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await res.json();

            if (json.success) {
                if (action === 'register') {
                    // Show success and slide to login
                    successDiv.innerText = json.message;
                    successDiv.classList.remove('hidden');
                    container.classList.remove("right-panel-active");
                } else {
                    // Redirect on login success
                    window.location.href = json.redirect;
                }
            } else {
                errorDiv.innerText = json.message;
                errorDiv.classList.remove('hidden');
            }
        } catch (err) {
            console.error("Auth Error:", err);
        }
    }

    document.getElementById('loginForm').addEventListener('submit', (e) => handleAuth(e, 'login'));
    document.getElementById('registerForm').addEventListener('submit', (e) => handleAuth(e, 'register'));
</script>
</body>
</html>