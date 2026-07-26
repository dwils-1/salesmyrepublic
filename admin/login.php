<?php
require 'config.php';

$error="";

if($_SERVER['REQUEST_METHOD']=="POST"){

    if(
        $_POST['username']==ADMIN_USER &&
        password_verify($_POST['password'],ADMIN_PASS)
    ){
        $_SESSION['login']=true;
        header("Location: dashboard.php");
        exit;
    }

    $error="Username atau Password salah";
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>SalesMyRepublic Admin</title>

<style>
body{
background:#f4f4f4;
font-family:Arial;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.box{
background:#fff;
padding:30px;
width:330px;
border-radius:10px;
box-shadow:0 5px 20px rgba(0,0,0,.15);
}

input{
width:100%;
padding:12px;
margin:8px 0;
box-sizing:border-box;
}

button{
width:100%;
padding:12px;
background:#5d2de1;
color:#fff;
border:0;
cursor:pointer;
}

.error{
color:red;
margin-bottom:10px;
}
</style>

</head>

<body>

<div class="box">

<h2>Admin Login</h2>

<?php if($error!="") echo "<div class='error'>$error</div>"; ?>

<form method="post">

<input
name="username"
placeholder="Username"
required>

<input
type="password"
name="password"
placeholder="Password"
required>

<button>LOGIN</button>

</form>

</div>

</body>
</html>
