const owner="dwils-1";
const repo="salesmyrepublic";

async function upload(){

const token=prompt("GitHub Token");

const f=document.getElementById("file").files[0];

if(!f) return;

const b=await f.arrayBuffer();

const base64=btoa(String.fromCharCode(...new Uint8Array(b)));

const path="assets/uploads/"+f.name;

const r=await fetch(
`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
{
method:"PUT",
headers:{
Authorization:"Bearer "+token,
Accept:"application/vnd.github+json"
},
body:JSON.stringify({
message:"Upload "+f.name,
content:base64
})
}
);

alert(r.ok?"Upload berhasil":"Upload gagal");
}
