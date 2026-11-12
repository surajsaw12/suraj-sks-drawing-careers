(() => {
 const cats=window.SKS_CATEGORIES||[];
 const root=document.getElementById('category-page');
 const id=new URLSearchParams(location.search).get('id');
 const cat=cats.find(c=>c.id===id);
 const year=document.getElementById('year'); if(year)year.textContent=new Date().getFullYear();
 const slug=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const hash=s=>[...s].reduce((a,c)=>((a*31)+c.charCodeAt(0))>>>0,7);
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 if(!cat){root.innerHTML='<div class="career-not-found"><h1>Category not found</h1><p>This category link may be incorrect.</p><a href="index.html#categories">Return to all categories →</a></div>';return}
 document.title=cat.title+' | SURAJ SKS';
 const cards=cat.careers.map((name,i)=>{
   const tags=(name+' '+cat.title).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,',');
   const photo=`https://loremflickr.com/900/650/${encodeURIComponent(tags+',art,design,sketch')}?lock=${hash(name+'|'+cat.id)}`;
   return `<a class="category-card career-choice-card" href="career.html?id=${encodeURIComponent(slug(name))}&category=${encodeURIComponent(cat.id)}" style="--card-image:url('${photo}')"><div class="card-content"><span class="card-number">CAREER ${String(i+1).padStart(2,'0')}</span><h3>${esc(name)}</h3><p>Explore role-specific skills, techniques, tools, workflow and portfolio practice.</p></div><span class="card-arrow">↗</span></a>`;
 }).join('');
 root.innerHTML=`<div class="breadcrumbs"><a href="index.html">Home</a> / <a href="index.html#categories">Categories</a> / ${esc(cat.title)}</div><section class="career-hero" style="--career-image:url('https://loremflickr.com/1400/800/${encodeURIComponent(cat.title.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,',')+',art,design')}?lock=${hash(cat.id)}')"><div class="career-hero-content"><span class="pill">CATEGORY · ${String(cats.indexOf(cat)+1).padStart(2,'0')}</span><h1>${esc(cat.title)}</h1><p>${esc(cat.intro)}</p><span class="pill">${cat.careers.length} CAREER PATHS</span></div></section><div class="section-heading"><div><span class="eyebrow">CHOOSE A CAREER TO EXPLORE</span><h2>Careers in <em>${esc(cat.title)}</em></h2><p>Every career opens a dedicated learning profile with its own skills, workflow, tools, photo references and practice brief.</p></div></div><div class="category-grid">${cards}</div><div class="content-card" style="margin-top:28px"><h2><span>✎</span>How to use this category</h2><p>Choose a career, study its specialist workflow and complete the practice brief. Build a portfolio with your research, sketches, process stages and original final work. Requirements differ between employers and regions, so use each profile as a learning guide rather than a formal qualification standard.</p></div>`;
})();