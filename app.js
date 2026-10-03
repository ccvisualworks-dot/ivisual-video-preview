const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close':'Menu'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu';menu.focus()}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),motion=document.querySelector('.motion');
let paused=reduced.matches,frame=0,time=0,last=0;
function setPaused(value){paused=value;document.body.classList.toggle('paused',paused);motion.textContent=paused?'Play background':'Pause background';motion.setAttribute('aria-pressed',String(paused));if(!paused&&!frame)frame=requestAnimationFrame(draw)}
motion?.addEventListener('click',()=>setPaused(!paused));
reduced.addEventListener('change',e=>setPaused(e.matches));
const canvas=document.querySelector('#flow'),ctx=canvas.getContext('2d');let w=0,h=0,pointer=.5;
function size(){const d=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);if(paused)draw(0)}
addEventListener('resize',size);addEventListener('pointermove',e=>{pointer=e.clientX/innerWidth},{passive:true});
function draw(ts){frame=0;if(document.hidden){last=0;return}if(ts-last<32&&!paused){frame=requestAnimationFrame(draw);return}last=ts;if(!paused)time+=.012;ctx.clearRect(0,0,w,h);const mobile=w<650,lines=mobile?22:38;for(let j=0;j<lines;j++){ctx.beginPath();for(let x=-40;x<=w+40;x+=mobile?24:18){const nx=x/w;const wave=Math.sin(nx*4+time+j*.08)*h*.17+Math.sin(nx*7-time*.65+j*.065)*h*.075;const y=h*.32+j*(h*.016)+wave+(pointer-.5)*Math.sin(nx*3+time)*25;if(x===-40)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.strokeStyle=`hsla(${155+j*4.8},78%,${58+j*.2}%,${.16+Math.sin(j/lines*Math.PI)*.24})`;ctx.lineWidth=j%7===0?1.35:.65;ctx.stroke()}if(!paused)frame=requestAnimationFrame(draw)}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!paused&&!frame)frame=requestAnimationFrame(draw)});size();setPaused(paused);
const choices={peanut:{image:'assets/peanut.png',name:'Peanut Lulu',type:'Pet shop website concept',link:'demos/peanut-lulu/index.html'},restaurant:{image:'assets/ember-preview.png',name:'Ember & Plate',type:'Restaurant website concept',link:'assets/ember-preview.png'}};
document.querySelectorAll('[data-sample]').forEach(button=>button.addEventListener('click',()=>{const chosen=choices[button.dataset.sample];document.querySelector('#sample-image').src=chosen.image;document.querySelector('#sample-image').alt=chosen.type;document.querySelector('#sample-name').textContent=chosen.name;document.querySelector('#sample-type').textContent=chosen.type;document.querySelector('#sample-url').textContent=chosen.name.toLowerCase().replaceAll(' ','');document.querySelector('#sample-link').href=chosen.link;document.querySelectorAll('[data-sample]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const f=button.dataset.filter;document.querySelectorAll('[data-kind]').forEach(card=>card.hidden=f!=='all'&&card.dataset.kind!==f);document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}));
document.querySelector('#enquiry')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const message=`Hi iVisual.cc, I'm ${data.get('name')}. I'm interested in ${data.get('service')}.\n\n${data.get('message')}`;window.open('https://wa.me/60162818368?text='+encodeURIComponent(message),'_blank','noopener');document.querySelector('#form-status').textContent='Your enquiry is ready in WhatsApp. Review it there and press Send.'});

// Brief press feedback also remains visible after quick touchscreen taps.
document.querySelectorAll('.btn,.sample-switch button,.work-tabs button,.menu,.motion,.whatsapp').forEach(control=>{
 let feedbackTimer;
 const feedback=()=>{clearTimeout(feedbackTimer);control.classList.add('is-pressed');feedbackTimer=setTimeout(()=>control.classList.remove('is-pressed'),240)};
 control.addEventListener('pointerdown',feedback);
 control.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')feedback()});
});
