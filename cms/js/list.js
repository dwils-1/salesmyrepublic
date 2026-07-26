async function loadArticles(){

const r=await fetch("https://raw.githubusercontent.com/dwils-1/salesmyrepublic/main/data/articles.json?"+Date.now());
const data=await r.json();

window.articles=data;

const tbody=document.getElementById("list");
tbody.innerHTML="";

data.forEach((a,i)=>{

tbody.innerHTML+=`
<tr>
<td>${a.title}</td>
<td>${a.slug}</td>
<td>${a.created}</td>
<td>
<button onclick="editArticle(${i})">Edit</button>
<button onclick="deleteArticle(${i})">Hapus</button>
</td>
</tr>
`;

});

}

function editArticle(i){

const a=window.articles[i];

document.getElementById("title").value=a.title;
document.getElementById("content").value=a.content;

window.editIndex=i;

}

function deleteArticle(i){

if(!confirm("Hapus artikel?")) return;

window.articles.splice(i,1);

alert("Langkah berikutnya: tombol Publish akan diperbarui agar menyimpan perubahan ke GitHub.");

}

loadArticles();
