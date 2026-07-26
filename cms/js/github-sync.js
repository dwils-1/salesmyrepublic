const OWNER="dwils-1";
const REPO="salesmyrepublic";
const FILE="data/articles.json";

async function saveGithub(data){

const token=localStorage.token||prompt("GitHub Token");

localStorage.token=token;

const h={
Authorization:"Bearer "+token,
Accept:"application/vnd.github+json"
};

const f=await fetch(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`,
{headers:h}
);

const j=await f.json();

const body=btoa(
unescape(
encodeURIComponent(
JSON.stringify(data,null,2)
)
)
);

const r=await fetch(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`,
{
method:"PUT",
headers:{
...h,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"CMS Update Articles",
content:body,
sha:j.sha
})
}
);

if(r.ok){

alert("GitHub berhasil diupdate");

}else{

alert(await r.text());

}

}
