async function loadArticles(){

const r=await fetch("https://raw.githubusercontent.com/dwils-1/salesmyrepublic/main/data/articles.json?"+Date.now());

const data=await r.json();

const list=document.getElementById("list");

list.innerHTML="";

data.forEach((a,i)=>{

list.innerHTML+=`
<tr>
<td>${a.title}</td>
<td>${a.slug}</td>
<td>
<button onclick="editArticle(${i})">Edit</button>
</td>
</tr>
`;

});

window.articles=data;

}

function editArticle(i){

const a=window.articles[i];

document.getElementById("title").value=a.title;

document.getElementById("content").value=a.content;

window.editIndex=i;

}

loadArticles();
