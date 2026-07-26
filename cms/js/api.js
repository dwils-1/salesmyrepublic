const GITHUB={

owner:"dwils-1",
repo:"salesmyrepublic",

token(){
return localStorage.getItem("github_token");
},

setToken(t){
localStorage.setItem("github_token",t);
},

headers(){
return{
Authorization:"Bearer "+this.token(),
Accept:"application/vnd.github+json"
};
},

async read(file){

const r=await fetch(
`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${file}`,
{headers:this.headers()}
);

const j=await r.json();

return{
sha:j.sha,
data:JSON.parse(atob(j.content))
};

},

async write(file,data,message){

const old=await this.read(file);

await fetch(
`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${file}`,
{
method:"PUT",
headers:{
...this.headers(),
"Content-Type":"application/json"
},
body:JSON.stringify({
message,
content:btoa(unescape(encodeURIComponent(JSON.stringify(data,null,2)))),
sha:old.sha
})
}
);

}

};
