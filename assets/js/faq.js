document.addEventListener("DOMContentLoaded",()=>{

const khusus={
bandaaceh:"Banda Aceh",
deliserdang:"Deli Serdang",
jakartabarat:"Jakarta Barat",
karanganyar:"Karanganyar",
metroyogyakarta:"Metro Yogyakarta",
palangkaraya:"Palangka Raya",
pematangsiantar:"Pematang Siantar"
};

let folder=location.pathname.split("/").filter(Boolean)[0]||"";
let kota=khusus[folder]||folder.replace(/-/g," ").replace(/\b\w/g,m=>m.toUpperCase());

if(!kota) kota="Indonesia";

const tombol=document.createElement("div");
tombol.id="faqButton";
tombol.innerHTML="💬 FAQ";
const footer=document.querySelector(".site-footer");
if(footer){
    footer.after(tombol);
}else{
    document.body.appendChild(tombol);
}

const halaman=document.createElement("div");
halaman.id="faqPage";

halaman.innerHTML=`
<div class="faqHeader">
<button id="faqBack">← Kembali</button>
<h2>FAQ ${kota}</h2>
</div>

<div class="faqBody">
${FAQ_DATA.map(item=>`
<details>
<summary>${item.q.replaceAll("{{KOTA}}",kota)}</summary>
<p>${item.a.replaceAll("{{KOTA}}",kota)}</p>
</details>
`).join("")}
</div>
`;

document.body.appendChild(halaman);

tombol.onclick=()=>{
halaman.classList.add("show");
document.body.style.overflow="hidden";
};

document.getElementById("faqBack").onclick=()=>{
halaman.classList.remove("show");
document.body.style.overflow="";
};

});
