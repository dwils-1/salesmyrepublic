let articles=[];
let editIndex=-1;

async function load(){

articles=await fetch("../data/articles.json?"+Date.now()).then(r=>r.json());

render();
saveGithub(articles);

}

function render(){

const tbody=document.getElementById("tbody");

tbody.innerHTML="";

articles.forEach((a,i)=>{

tbody.innerHTML+=`
<tr>
<td>${i+1}</td>
<td>${a.title}</td>
<td>${a.slug}</td>
<td>
<button onclick="edit(${i})">Edit</button>
<button onclick="hapus(${i})">Hapus</button>
</td>
</tr>
`;

});

}

function edit(i){

editIndex=i;

title.value=articles[i].title;
content.value=articles[i].content;

}

function hapus(i){

if(!confirm("Hapus artikel?")) return;

articles.splice(i,1);

render();
saveGithub(articles);

}

function simpan(){

const obj={
title:title.value,
slug:title.value.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,""),
content:content.value,
created:new Date().toISOString()
};

if(editIndex==-1){

articles.push(obj);

}else{

articles[editIndex]=obj;

editIndex=-1;

}

title.value="";
content.value="";

render();
saveGithub(articles);

saveGithub(articles);

}

function download(){

const blob=new Blob(
[JSON.stringify(articles,null,2)],
{type:"application/json"}
);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="articles.json";

a.click();

}
load();
