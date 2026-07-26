<?php
require 'config.php';
require 'includes/auth.php';
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Dashboard</title>

<style>

body{
margin:0;
font-family:Arial;
display:flex;
}

.sidebar{
width:240px;
background:#5d2de1;
height:100vh;
color:white;
padding:20px;
box-sizing:border-box;
}

.sidebar a{
display:block;
padding:10px;
color:white;
text-decoration:none;
}

.sidebar a:hover{
background:#4b20c5;
}

.main{
flex:1;
padding:30px;
background:#f5f5f5;
}

.card{
background:white;
padding:20px;
border-radius:10px;
margin-bottom:20px;
}

</style>

</head>

<body>

<div class="sidebar">

<h2>SalesMyRepublic</h2>

<a href="dashboard.php">Dashboard</a>
<a href="articles.php">Artikel</a>
<a href="faq.php">FAQ</a>
<a href="promo.php">Promo</a>
<a href="leads.php">Leads</a>
<a href="heatmap.php">Heatmap</a>
<a href="analytics.php">Analytics</a>
<a href="seo.php">SEO</a>
<a href="setting.php">Setting</a>
<a href="logout.php">Logout</a>

</div>

<div class="main">

<div class="card">
<h2>Dashboard Admin</h2>
<p>Selamat datang.</p>
</div>

<div class="card">
<h3>Total Kota</h3>
<h1>100+</h1>
</div>

<div class="card">
<h3>Total Artikel</h3>
<h1>0</h1>
</div>

<div class="card">
<h3>Total Leads Hari Ini</h3>
<h1>0</h1>
</div>

</div>

</body>
</html>
