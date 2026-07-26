<?php
session_start();

define('ADMIN_USER','admin');
define('ADMIN_PASS',password_hash('admin123', PASSWORD_DEFAULT));
?>
