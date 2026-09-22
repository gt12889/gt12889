import { projects } from './projects.mjs';
import { Workshop } from './engine.mjs';
import { renderScene } from './renderer.mjs';

const $ = id => document.getElementById(id);
const canvas = $('scene');
const context = canvas.getContext('2d');
const game = new Workshop(projects.length);
game.select(0);
const input = {};
const storageKey = 'tuan-build-lab-v1';
let sound = false, audio, frame, last = 0, lastUi = 0, inView = true;
let displayed = '', previousBuilds = 0, previousPhase = '', returnFocus;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
game.paused = motion.matches;

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  if (Number.isSafeInteger(saved.built) && saved.built >= 0) game.built = saved.built;
  if (Array.isArray(saved.discovered)) {
    for (const id of saved.discovered) {
      const i = projects.findIndex(p => p.id === id);
      if (i >= 0) game.discovered.add(i);
    }
  }
} catch { /* Private browsing and invalid storage still get a complete game. */ }
previousBuilds = game.built;

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({ built: game.built, discovered: [...game.discovered].map(i => projects[i].id) })); } catch { /* Optional persistence. */ }
}
function announce(message) { $('announcement').textContent = message; }
function beep(frequency = 540) {
  if (!sound) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    void audio.resume().catch(() => {});
    const oscillator = audio.createOscillator(), gain = audio.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.035, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.12);
    oscillator.connect(gain); gain.connect(audio.destination);
    oscillator.start(); oscillator.stop(audio.currentTime + 0.14);
  } catch { sound = false; updateSound(); }
}
function updateSound() {
  $('sound').textContent = sound ? 'Sound on' : 'Sound off';
  $('sound').setAttribute('aria-pressed', String(sound));
  $('sound').setAttribute('aria-label', sound ? 'Disable sound' : 'Enable sound');
}

projects.forEach((p,i) => {
  const button = document.createElement('button');
  button.className = 'project-card';
  button.id = `project-${p.id}`;
  button.setAttribute('aria-label', `Explore ${p.name}`);
  button.setAttribute('aria-pressed','false');
  // Content is a checked-in catalog, never remote or visitor input.
  button.innerHTML = `<span class="card-top"><span class="card-name">${p.name}</span><span class="card-number">0${i+1}</span></span><span class="card-description">${p.tagline}</span><span class="card-stack">${p.stack.join(' · ')}</span>`;
  button.addEventListener('click', () => {
    game.select(i); game.paused = false; sync(); start();
    $('workshop').scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
    announce(`Exploring ${p.name}. ${p.description}`);
  });
  $('project-grid').append(button);
});

function sync() {
  const p = projects[game.index];
  if (displayed !== p.id) {
    displayed = p.id;
    $('project-name').textContent = p.name;
    $('project-tagline').textContent = p.tagline;
    $('project-number').textContent = `PROJECT ${String(game.index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
    $('source-link').href = p.url;
    $('source-link').setAttribute('aria-label', `View ${p.name} repository on GitHub`);
    document.querySelectorAll('.project-card').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===game.index)));
    if (previousPhase) announce(`Now on the workbench: ${p.name}. ${p.tagline}`);
  }
  $('build-count').textContent = String(game.built).padStart(2,'0');
  $('collection-count').textContent = `${game.discovered.size}/${projects.length}`;
  $('phase').textContent = game.bug ? 'DEBUG' : game.phaseName;
  $('build-step').textContent = game.bug ? 'A tiny bug. Help the bots untangle it.' : p.steps[game.phase];
  $('progress').value = ((game.phase + Math.min(1,game.progress)) / 4) * 100;
  document.querySelectorAll('[data-phase]').forEach((el,i)=>el.classList.toggle('active',i<=game.phase));
  $('pause').textContent = game.paused ? 'Resume' : 'Pause';
  $('pause').setAttribute('aria-pressed',String(game.paused));
  $('pause-overlay').hidden = !game.paused;
  $('scene-status').textContent = game.paused ? 'WORKSHOP PAUSED' : game.joined ? 'YOU’RE IN THE WORKSHOP' : 'WORKSHOP RUNNING';
  $('run-dot').style.background = game.paused ? '#78879a' : '#91d3b0';
  $('join').innerHTML = game.joined ? 'Back to watching <span>↗</span>' : 'Join the workshop <span>↗</span>';
  $('join').setAttribute('aria-pressed',String(game.joined));
  $('assist').disabled = game.paused || game.phase === 3;
  $('touch-controls').hidden = !game.joined;
  $('controls-note').textContent = game.joined ? 'You’re Tuan. A / D or ← → move · Shift runs · Space jumps · J helps. Focus the scene to use keys.' : 'Watch the bots work, click the scene to help, or join in. Sound starts off.';
  $('lead-claude').setAttribute('aria-pressed',String(game.leader==='claude'));
  $('lead-codex').setAttribute('aria-pressed',String(game.leader==='codex'));
  const phaseKey = `${game.index}-${game.phase}-${game.bug}`;
  if (phaseKey !== previousPhase) {
    previousPhase = phaseKey;
    if (game.bug) announce('A bug appeared. Use Help build to fix it, or the bots will handle it.');
    if (game.phase === 3) announce(`${p.name} illustration complete. ${game.discovered.size} of ${projects.length} projects explored.`);
  }
  if (game.built !== previousBuilds) {
    previousBuilds = game.built; save(); beep(880);
    game.discovered.forEach(i=>{const item=$(`project-${projects[i].id}`).querySelector('.card-number');item.textContent='SEEN';});
  }
  draw();
}
function draw() {
  const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1,2);
  const w = Math.round(r.width*dpr), h = Math.round(r.height*dpr);
  if (canvas.width!==w || canvas.height!==h) {canvas.width=w;canvas.height=h;}
  context.setTransform(dpr,0,0,dpr,0,0);
  renderScene(context,game,projects[game.index],r.width,r.height);
}
function canAnimate() {return !document.hidden && inView && !game.paused && !$('help-dialog').open;}
function loop(now) {
  frame = undefined;
  if (!canAnimate()) {last=0;return;}
  const elapsed = last ? (now-last)/1000 : 0;
  last=now; game.tick(elapsed,input);
  if(now-lastUi>100){sync();lastUi=now;}else draw();
  frame=requestAnimationFrame(loop);
}
function start() {if(frame===undefined && canAnimate())frame=requestAnimationFrame(loop);}
function stop() {if(frame!==undefined)cancelAnimationFrame(frame);frame=undefined;last=0;Object.keys(input).forEach(k=>delete input[k]);}
function pause() {game.paused=!game.paused;stop();sync();start();announce(game.paused?'Workshop paused.':'Workshop resumed.');}
function assist(){if(game.assist()){beep(game.bug?360:620);sync();announce('Build assisted. Thanks for lending a hand!');}}

$('pause').addEventListener('click',pause);
$('resume').addEventListener('click',pause);
$('sound').addEventListener('click',()=>{sound=!sound;updateSound();beep();});
$('join').addEventListener('click',()=>{game.joined=!game.joined;game.paused=false;sync();canvas.focus({preventScroll:true});start();announce(game.joined?'You joined as Tuan. Use arrows to move, Space to jump, J to help.':'Back to watching.');});
$('assist').addEventListener('click',assist);
$('shuffle').addEventListener('click',()=>{game.next();sync();start();beep(450);});
canvas.addEventListener('click',assist);
for(const who of ['claude','codex'])$(`lead-${who}`).addEventListener('click',()=>{game.leader=game.leader===who?'both':who;sync();beep(who==='claude'?440:660);announce(game.leader==='both'?'Both bots share the spotlight.':`${who==='claude'?'Claude':'Codex'} is the lead builder.`);});
$('help').addEventListener('click',()=>{returnFocus=document.activeElement;stop();$('help-dialog').showModal();});
$('help-dialog').addEventListener('close',()=>{returnFocus?.focus();start();});

canvas.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  const key=event.key.toLowerCase();
  if(['arrowleft','arrowright','a','d',' ','j','shift'].includes(key))event.preventDefault();
  if(key==='arrowleft'||key==='a')input.left=true;
  if(key==='arrowright'||key==='d')input.right=true;
  if(key==='shift')input.run=true;
  if(!event.repeat && key===' ')game.jump();
  if(!event.repeat && key==='j')assist();
  if(!event.repeat && key==='escape')pause();
});
document.addEventListener('keyup',event=>{
  const key=event.key.toLowerCase();
  if(key==='arrowleft'||key==='a')input.left=false;
  if(key==='arrowright'||key==='d')input.right=false;
  if(key==='shift')input.run=false;
});
canvas.addEventListener('blur',()=>Object.keys(input).forEach(k=>delete input[k]));
window.addEventListener('blur',()=>{stop();});
window.addEventListener('focus',start);
document.addEventListener('visibilitychange',()=>{stop();start();});
document.querySelectorAll('[data-hold]').forEach(button=>{
  button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);input[button.dataset.hold]=true;});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>{input[button.dataset.hold]=false;});
});
$('jump-touch').addEventListener('click',()=>game.jump());
new ResizeObserver(draw).observe(canvas);
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView)stop();else start();},{threshold:0.05}).observe(canvas);
motion.addEventListener('change',event=>{if(event.matches){game.paused=true;stop();sync();}});
game.discovered.forEach(i=>{$(`project-${projects[i].id}`).querySelector('.card-number').textContent='SEEN';});
sync();start();
