<?php
$db=new SQLite3(__DIR__.'/../database/sales.db');

if($_SERVER['REQUEST_METHOD']=="POST"){
$title=trim($_POST['title']);
$slug=strtolower(trim(preg_replace('/[^a-z0-9]+/i','-', $title),'-'));
$content=$_POST['content'];

$stmt=$db->prepare("INSERT INTO articles(title,slug,content,status) VALUES(:t,:s,:c,'publish')");
$stmt->bindValue(':t',$title,SQLITE3_TEXT);
$stmt->bindValue(':s',$slug,SQLITE3_TEXT);
$stmt->bindValue(':c',$content,SQLITE3_TEXT);
$stmt->execute();

header("Location: articles.php");
exit;
}

$data=$db->query("SELECT * FROM articles ORDER BY id DESC");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Artikel</title>
<style>
body{font-family:Arial;background:#f5f5f5;margin:20px}
input,textarea{width:100%;padding:10px;margin:8px 0}
button{padding:10px 20px;background:#6a00ff;color:#fff;border:0}
table{width:100%;background:#fff;border-collapse:collapse;margin-top:20px}
td,th{padding:10px;border:1px solid #ddd}
</style>
<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
<script>
tinymce.init({
selector:"textarea",
height:600,
plugins:"image link table lists code media autoresize",
toolbar:"undo redo | styles | bold italic | alignleft aligncenter alignright | bullist numlist | image link table | code",
images_upload_url:"upload.php",
automatic_uploads:true,
file_picker_types:"image"
});
</script>
</head>
<body>

<h2>Tambah Artikel</h2>

<form method="post">
<input name="title" placeholder="Judul Artikel" required>
<textarea name="content" rows="8" placeholder="Isi Artikel"></textarea>
<button>Simpan</button>
</form>

<h2>Daftar Artikel</h2>

<table>
<tr>
<th>ID</th>
<th>Judul</th>
<th>Slug</th>
<th>Status</th>
</tr>

<?php while($r=$data->fetchArray(SQLITE3_ASSOC)){ ?>

<tr>
<td><?=$r['id']?></td>
<td><?=$r['title']?></td>
<td><?=$r['slug']?></td>
<td><?=$r['status']?></td>
</tr>

<?php } ?>

</table>

</body>
</html>
