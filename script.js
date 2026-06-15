/* ── 3D BACKGROUND ── */
(()=>{
  const c=document.getElementById('bg');
  const r=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true});
  r.setPixelRatio(Math.min(devicePixelRatio,2));
  const sc=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,200);
  cam.position.z=28;

  function resize(){
    r.setSize(innerWidth,innerHeight);
    cam.aspect=innerWidth/innerHeight;
    cam.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize',resize);

  // Particle field
  const pGeo=new THREE.BufferGeometry();
  const N=800,pos=new Float32Array(N*3),col=new Float32Array(N*3);
  const palette=[[.22,.74,.97],[.51,.55,.97],[.2,.83,.6],[.96,.28,.71]];
  for(let i=0;i<N;i++){
    pos[i*3]=(Math.random()-.5)*100;
    pos[i*3+1]=(Math.random()-.5)*100;
    pos[i*3+2]=(Math.random()-.5)*70;
    const p=palette[Math.floor(Math.random()*palette.length)];
    col[i*3]=p[0];col[i*3+1]=p[1];col[i*3+2]=p[2];
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  pGeo.setAttribute('color',new THREE.BufferAttribute(col,3));
  sc.add(new THREE.Points(pGeo,new THREE.PointsMaterial({size:.3,vertexColors:true,transparent:true,opacity:.8})));

  // Wireframe icosahedron
  const ico=new THREE.Mesh(
    new THREE.IcosahedronGeometry(7,1),
    new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true,transparent:true,opacity:.08})
  );
  ico.position.set(18,5,-5);
  sc.add(ico);

  // Torus knot
  const tk=new THREE.Mesh(
    new THREE.TorusKnotGeometry(4,.5,80,12),
    new THREE.MeshBasicMaterial({color:0x818cf8,wireframe:true,transparent:true,opacity:.1})
  );
  tk.position.set(-18,-5,-5);
  sc.add(tk);

  // Octahedron
  const oct=new THREE.Mesh(
    new THREE.OctahedronGeometry(3),
    new THREE.MeshBasicMaterial({color:0x34d399,wireframe:true,transparent:true,opacity:.09})
  );
  oct.position.set(0,14,-10);
  sc.add(oct);

  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{
    mx=(e.clientX/innerWidth-.5)*2;
    my=-(e.clientY/innerHeight-.5)*2;
  });

  let t=0;
  (function loop(){
    requestAnimationFrame(loop);
    t+=.004;
    ico.rotation.x=t*.25;ico.rotation.y=t*.4;
    tk.rotation.x=t*.3;tk.rotation.y=t*.2;
    oct.rotation.x=t*.35;oct.rotation.z=t*.25;
    cam.position.x+=(mx*4-cam.position.x)*.025;
    cam.position.y+=(my*3-cam.position.y)*.025;
    cam.lookAt(0,0,0);
    r.render(sc,cam);
  })();
})();

/* ── HAMBURGER MENU ── */
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');

hamburger.addEventListener('click',()=>{
  const isOpen=navLinks.classList.toggle('open');
  hamburger.classList.toggle('open',isOpen);
  hamburger.setAttribute('aria-expanded',isOpen);
});

// Close menu when clicking outside
document.addEventListener('click',e=>{
  if(!hamburger.contains(e.target)&&!navLinks.contains(e.target)){
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
  }
});

function closeMenu(){
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded','false');
}

/* ── SCROLL FADE IN ── */
const obs=new IntersectionObserver(
  es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),
  {threshold:.08}
);
document.querySelectorAll('.fade-in').forEach(el=>obs.observe(el));
setTimeout(()=>document.querySelector('.hero .fade-in').classList.add('visible'),80);

/* ── TYPING EFFECT ── */
const phrases=['DigiPOS Back Office','Enterprise ERP Systems','React.js Frontends','WPF Desktop Apps'];
let pi=0,ci=0,del=false;
const typedEl=document.getElementById('typed');

function typeLoop(){
  const phrase=phrases[pi];
  if(!del){
    typedEl.textContent=phrase.slice(0,++ci);
    if(ci===phrase.length){del=true;setTimeout(typeLoop,1800);return}
  } else {
    typedEl.textContent=phrase.slice(0,--ci);
    if(ci===0){del=false;pi=(pi+1)%phrases.length}
  }
  setTimeout(typeLoop,del?45:80);
}
typeLoop();

/* ── CV CHAT ── */
const CV=`Name: Vethusshan Sivarajah | Role: Software Engineer | 4+ years experience
Location: Batticaloa, Sri Lanka | Phone: +94 777 806 627 | Email: vethusshan.sivarajah@gmail.com
LinkedIn: linkedin.com/in/vethusshan-sivarajah

SUMMARY: Software Engineer with 4+ years experience in enterprise desktop & web apps. Specialized in C# (.NET/WinForms/WPF) and React.js/Angular. Delivered ERP, POS, HRM systems across industries.

EXPERIENCE:
1. Software Engineer | Ella-Rose (Pvt) Ltd | Jul 2024–Present
   DigiPOS Back Office | WinForms/C#/.NET
   - Full-featured multi-location POS back office
   - Role-based access control → zero unauthorized incidents
   - Product Management: barcode, pricing, inventory → 40% faster updates
   - Supplier, Stock & Order management with low-stock alerts
   - Promotions Management engine
   - Reports Module (sales, stock, financial)
   - Optimized multi-location database schema

2. Associate Software Engineer | Mindox Techno (Pvt) Ltd | Jan 2022–Jul 2024
   ERP/ASP.NET, Metrology/WPF, EFEM/WinForms, Website/React.js
   - ERP Supplier Module (CRUD + search)
   - Resolved critical ERP bugs
   - Metrology UI: real-time charts, measurement algorithms, data export
   - EFEM: semiconductor equipment control, real-time monitoring, data logging
   - Company website in React.js

3. Intern | Swiss Ranks (Pvt) Ltd | Apr–Dec 2021
   - HRM bug fixes
   - WPF robot arm animation (storyboard)

SKILLS: C#, Java, JavaScript, PHP, SQL | React.js 18, Angular, HTML5, CSS3, WPF, WinForms | ASP.NET Core MVC, .NET Framework, Web API, JSP | MSSQL, MySQL | Git, GitHub, VS, VSCode

EDUCATION: BSc (Hons) IT — SLIIT 2020

PROJECTS: Movie Ticket Booking (ASP.NET), Hospital Management (WinForms), Bookstore (C#/.NET), Camera Ordering (ASP.NET), Employee Management (JSP), Food Ordering (PHP), Smart ATM (JSP/Raspberry Pi)

LANGUAGES: Tamil (Native), English (Professional)`;

const chatBox=document.getElementById('chatBox');
const chatInput=document.getElementById('chatInput');
let hist=[];

function addMsg(text,role){
  const d=document.createElement('div');
  d.className='msg '+role;
  d.innerHTML=role==='bot'?marked.parse(text):text;
  chatBox.appendChild(d);
  chatBox.scrollTop=chatBox.scrollHeight;
}

function showTyping(){
  const d=document.createElement('div');
  d.className='typing';d.id='tp';
  d.innerHTML='<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
  chatBox.appendChild(d);
  chatBox.scrollTop=chatBox.scrollHeight;
}

function removeTyping(){
  const e=document.getElementById('tp');
  if(e)e.remove();
}

async function ask(q){
  chatInput.value=q;
  await sendMsg();
}

async function sendMsg(){
  const v=chatInput.value.trim();
  if(!v)return;
  chatInput.value='';
  addMsg(v,'user');
  hist.push({role:'user',content:v});
  showTyping();
  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-6',
        max_tokens:1000,
        system:`You are Vethusshan Sivarajah's CV assistant. Answer questions based on his CV only. Be concise, friendly, and professional. Format responses with markdown.\n\nCV:\n${CV}`,
        messages:hist
      })
    });
    const data=await res.json();
    removeTyping();
    const reply=data.content?.[0]?.text||'Sorry, could not get a response.';
    addMsg(reply,'bot');
    hist.push({role:'assistant',content:reply});
  }catch(e){
    removeTyping();
    addMsg('⚠️ Connection error. Please try again.','bot');
  }
}
