const {execSync}=require("child_process");

[
"git add .",
'git commit -m "Auto Deploy" || true',
"git push origin main"
].forEach(c=>{
try{
execSync(c,{stdio:"inherit"});
}catch(e){}
});
