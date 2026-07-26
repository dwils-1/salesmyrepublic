<?php
if(!is_dir("../uploads")) mkdir("../uploads",0777,true);

if(isset($_FILES["file"])){
    $name=time()."-".basename($_FILES["file"]["name"]);
    move_uploaded_file($_FILES["file"]["tmp_name"],"../uploads/".$name);
    echo json_encode([
        "location"=>"/uploads/".$name
    ]);
}
