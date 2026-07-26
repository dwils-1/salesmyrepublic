class Crud{

constructor(file){

this.file=file;

this.rows=[];

}

async load(){

const r=await GITHUB.read(this.file);

this.sha=r.sha;

this.rows=r.data;

return this.rows;

}

async save(){

await GITHUB.write(
this.file,
this.rows,
"CMS Update"
);

}

add(obj){

this.rows.push(obj);

return this.save();

}

update(i,obj){

this.rows[i]=obj;

return this.save();

}

delete(i){

this.rows.splice(i,1);

return this.save();

}

}
