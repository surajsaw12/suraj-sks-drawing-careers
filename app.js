(() => {
 const cats=window.SKS_CATEGORIES||[]; const grid=document.getElementById('category-grid');
 const img=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;
 const slug=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const all=cats.flatMap((c,ci)=>c.careers.map((name,i)=>({name,category:c.title,categoryId:c.id,id:slug(name),ci,i})));
 document.getElementById('career-count').textContent=all.length+'+';
 document.getElementById('year').textContent=new Date().getFullYear();
 function render(list){grid.innerHTML=list.map((c,i)=>`<a class="category-card" href="category.html?id=${encodeURIComponent(c.id)}" style="--card-image:url('${img(c.image)}')"><div class="card-content"><span class="card-number">CATEGORY ${String(cats.indexOf(c)+1).padStart(2,'0')} · ${c.careers.length} CAREERS</span><h3>${c.title}</h3><p>${c.intro}</p></div><span class="card-arrow">↗</span></a>`).join('');document.getElementById('category-empty').classList.toggle('hidden',list.length>0)}
 render(cats);
 document.getElementById('category-filter').addEventListener('input',e=>{const q=e.target.value.toLowerCase();render(cats.filter(c=>(c.title+' '+c.intro+' '+c.careers.join(' ')).toLowerCase().includes(q)))});
 document.getElementById('search-form').addEventListener('submit',e=>{e.preventDefault();const q=document.getElementById('career-search').value.trim().toLowerCase();if(!q)return;const found=all.find(x=>x.name.toLowerCase().includes(q));if(found)location.href=`career.html?id=${encodeURIComponent(found.id)}&category=${encodeURIComponent(found.categoryId)}`;else{const cat=cats.find(c=>c.title.toLowerCase().includes(q)||c.careers.some(n=>n.toLowerCase().includes(q)));if(cat)location.href=`category.html?id=${encodeURIComponent(cat.id)}`;else{document.getElementById('career-search').setCustomValidity('No matching career found. Try a different keyword.');document.getElementById('career-search').reportValidity();document.getElementById('career-search').setCustomValidity('')}}});
 const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>document.querySelector('.desktop-nav').classList.toggle('open'));
})();
