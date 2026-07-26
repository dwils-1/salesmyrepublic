const log=document.getElementById("log");

async function publish(){

log.textContent="Publishing...";

const token=document.getElementById("token").value.trim();
const title=document.getElementById("title").value.trim();
const content=document.getElementById("content").value.trim();

if(!token){log.textContent="Token kosong";return;}
if(!title){log.textContent="Judul kosong";return;}

const slug=title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

const article={
title,
slug,
content,
created:new Date().toISOString()
};

const owner="dwils-1";
const repo="salesmyrepublic";
const path="data/articles.json";

try{

let r=await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
});

let j=await r.json();

if(!r.ok){
log.textContent=JSON.stringify(j,null,2);
return;
}

let data=JSON.parse(atob(j.content));

data.push(article);

let body=btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2))));

r=await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json",
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"Tambah artikel "+title,
content:body,
sha:j.sha
})
});

j=await r.json();

if(r.ok){
log.textContent="BERHASIL";
}else{
log.textContent=JSON.stringify(j,null,2);
}

}catch(e){

log.textContent=e.toString();

}

}

async function loadArticles(){

const r=await fetch("https://raw.githubusercontent.com/dwils-1/salesmyrepublic/main/data/articles.json?"+Date.now());

const data=await r.json();

const list=document.getElementById("list");

list.innerHTML="";

data.reverse().forEach(a=>{

list.innerHTML+=`
<tr>
<td>${a.title}</td>
<td>${a.slug}</td>
<td>${a.created}</td>
</tr>
`;

});

}

loadArticles();

const oldPublish=publish;

publish=async()=>{

await oldPublish();

setTimeout(loadArticles,1500);

}
