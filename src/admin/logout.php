<?php
session_start();
session_destroy();
header('Location: /src/admin/login.php');
exit;