// Original procedural artwork. The same renderer powers the game and README GIF.
const mono = '"SFMono-Regular", Consolas, "Liberation Mono", monospace';
function rect(c,x,y,w,h,color,r=0){c.fillStyle=color;c.beginPath();if(r)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);c.fill();}
function line(c,x,y,x2,y2,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function label(c,text,x,y,color='#a5b5c7',size=11,align='left'){c.fillStyle=color;c.font=`${size}px ${mono}`;c.textAlign=align;c.fillText(text,x,y);}
function dot(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
function outline(c,x,y,w,h,color,r=0){c.strokeStyle=color;c.lineWidth=1;c.beginPath();if(r)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);c.stroke();}

function robot(c,x,y,type,t,active,bug){
  const warm=type==='claude',color=warm?'#d9956c':'#899af1';
  const bob=Math.sin(t*3+(warm?0:2))*2;
  c.save();c.translate(Math.round(x),Math.round(y+bob));
  c.fillStyle='#060b1280';c.beginPath();c.ellipse(0,4,34,6,0,0,Math.PI*2);c.fill();
  if(active){c.strokeStyle=color+'44';c.lineWidth=1;c.beginPath();c.ellipse(0,4,43,10,0,0,Math.PI*2);c.stroke();}
  const walk=Math.sin(t*7)>0?2:-2;
  rect(c,-23,-18,13,18+walk,color);rect(c,10,-18,13,18-walk,color);
  rect(c,-28,-52,56,40,color,4);rect(c,-24,-49,48,6,warm?'#e7ab84':'#a5b6ff',2);
  rect(c,-34,-39,8,20,color,2);rect(c,26,-39,8,20,color,2);
  if(warm){rect(c,-16,-61,32,11,color,2);rect(c,-31,-10,8,10,color);rect(c,23,-10,8,10,color);}
  else{rect(c,-19,-57,38,5,'#bac9ff',2);line(c,0,-57,0,-66,color,2);dot(c,0,-68,3,color);rect(c,-23,-38,46,17,'#25345d',3);}
  const blink=Math.sin(t*0.8)>0.993;
  rect(c,-14,-35,6,blink?2:7,'#141b28',1);rect(c,8,-35,6,blink?2:7,'#141b28',1);
  if(!warm){rect(c,-14,-34,5,blink?1:4,'#d4edff');rect(c,9,-34,5,blink?1:4,'#d4edff');}
  line(c,-5,-21,5,-21,warm?'#6c4135':'#d1ddff',2);
  rect(c,-42,-24,7,5,color,1);rect(c,35,-27,7,5,color,1);
  if(bug){label(c,'?',warm?-44:44,-67,'#f1c781',18,'center');}
  label(c,warm?'CLAUDE':'CODEX',0,26,color,10,'center');
  c.restore();
}

function human(c,x,y,t,player,joined){
  c.save();c.translate(Math.round(x),Math.round(y-player.y));
  c.fillStyle='#0004';c.beginPath();c.ellipse(0,4+player.y,23,5,0,0,Math.PI*2);c.fill();
  const stride=player.walking?Math.sin(t*16)*7:0;
  rect(c,-11,-25,9,24+stride,'#415477',1);rect(c,3,-25,9,24-stride,'#344766',1);
  rect(c,-14,-3+stride,13,5,'#b9c9da',1);rect(c,3,-3-stride,13,5,'#b9c9da',1);
  rect(c,-17,-52,34,29,'#78ae9a',3);rect(c,-4,-51,8,25,'#91c5af');
  rect(c,-24,-47,8,27+stride/2,'#679a88',2);rect(c,16,-47,8,27-stride/2,'#679a88',2);
  rect(c,-23,-24+stride/2,7,8,'#d9aa86',2);rect(c,17,-24-stride/2,7,8,'#d9aa86',2);
  rect(c,-12,-78,25,27,'#d9aa86',4);rect(c,-14,-81,28,10,'#2b3037',3);rect(c,-14,-75,6,13,'#2b3037');
  rect(c,-9,-66,8,6,'#263b43',1);rect(c,4,-66,8,6,'#263b43',1);line(c,-1,-64,4,-64,'#263b43',2);
  line(c,0,-55,6,-55,'#78574a',1);
  label(c,joined?'YOU / TUAN':'TUAN',0,25,joined?'#b8f0ce':'#8497a9',9,'center');
  if(joined){c.fillStyle='#a9dbbd';c.beginPath();c.moveTo(-4,-94);c.lineTo(4,-94);c.lineTo(0,-89);c.fill();}
  c.restore();
}

function audioArt(c,w,h,t,p,color){
  label(c,'LOCAL AUDIO WORKSPACE',20,30,'#8a9bac',10);
  ['MIC','SYSTEM'].forEach((name,k)=>{
    const y=63+k*61;label(c,name,20,y-7,'#637b90',8);
    line(c,20,y+12,w-20,y+12,'#23323e');
    for(let i=0;i<65;i++){
      const x=23+i*(w-50)/65,a=(Math.sin(i*0.91+k*1.7)*Math.sin(i*0.33-t*1.2)+1.2)*14;
      rect(c,x,y+12-a/2,3,a,i/65<p?color:'#293943',1);
    }
  });
  rect(c,20,h-51,w-40,31,'#172c2a',4);dot(c,34,h-36,3,'#92cfb3');label(c,'2 TRACKS  /  ON-DEVICE TRANSCRIPT',46,h-32,'#a1c5b4',9);
  const cursor=23+(w-48)*((t*0.13)%1);line(c,cursor,44,cursor,154,color+'66');
}

function graphArt(c,w,h,t,p,color){
  const points=[[.5,.45],[.22,.27],[.24,.68],[.76,.24],[.8,.64],[.52,.8],[.5,.14]];
  const names=['BRIEFING','COMMUNITY','MARKET','SOURCES','POLICY','RETRIEVAL','SIGNALS'];
  for(let i=1;i<points.length;i++){
    const [x,y]=points[i],[cx,cy]=points[0];line(c,cx*w,cy*h,x*w,y*h,'#33514c');
    const v=(t*.35+i*.2)%1;dot(c,(cx+(x-cx)*v)*w,(cy+(y-cy)*v)*h,2,color);
  }
  points.forEach(([x,y],i)=>{
    const show=i===0||i/points.length<p,sz=i===0?25:14;
    dot(c,x*w,y*h,sz+5,show?'#1f3a33':'#17272d');dot(c,x*w,y*h,sz,show?color+'60':'#2d3b43');
    outline(c,x*w-sz,y*h-sz,sz*2,sz*2,show?color:'#40505d',i===0?7:sz);
    label(c,i===0?'A':String(i).padStart(2,'0'),x*w,y*h+4,show?'#d6efdf':'#647786',i===0?19:9,'center');
    label(c,names[i],x*w,y*h+sz+16,'#829b98',8,'center');
  });
}

function searchArt(c,w,h,t,p,color){
  rect(c,22,22,w-44,33,'#1b2638',4);dot(c,38,37,5,'#4e6083');label(c,'semantic query → source evidence',53,42,'#b8c6e5',10);
  const matches=[.92,.86,.79];
  for(let i=0;i<3;i++){
    const y=71+i*49,loaded=p>(i+1)*.2;
    rect(c,22,y,w-44,38,loaded?'#1b283a':'#141e2c',4);
    rect(c,33,y+9,16,20,loaded?'#6078a8':'#32415a',2);line(c,37,y+15,45,y+15,'#b6c8e6');line(c,37,y+20,43,y+20,'#b6c8e6');
    label(c,'Source document 0'+(i+1),61,y+16,loaded?'#bac9e2':'#657791',9);
    rect(c,61,y+24,(w-158)*matches[i]*(loaded?1:.25),2,loaded?color:'#394965');
    label(c,loaded?'LINKED':'INDEX',w-39,y+23,loaded?'#9ed7b7':'#61738e',8,'right');
  }
  label(c,'ILLUSTRATIVE DOCUMENT RETRIEVAL',w/2,h-9,'#62778f',7,'center');
}

function flightArt(c,w,h,t,p,color,travel=false){
  for(let x=20;x<w;x+=28)line(c,x,20,x,h-28,'#1d2e3b');
  for(let y=20;y<h-15;y+=28)line(c,20,y,w-20,y,'#1d2e3b');
  const pts=travel?[[.12,.68],[.36,.38],[.67,.52],[.88,.23]]:[[.1,.65],[.28,.42],[.5,.58],[.68,.23],[.9,.38]];
  const position=(t*.13)%(pts.length-1),i=Math.floor(position),f=position-i;
  c.setLineDash([4,6]);
  for(let j=1;j<pts.length;j++)line(c,pts[j-1][0]*w,pts[j-1][1]*h,pts[j][0]*w,pts[j][1]*h,j/(pts.length-1)<=p?color:'#3c5261');
  c.setLineDash([]);
  pts.forEach(([x,y],j)=>{dot(c,x*w,y*h,7,'#182a35');dot(c,x*w,y*h,3,color);label(c,travel?['ARRIVAL','FAMILY','ASSIST','GATE'][j]:'WP 0'+(j+1),x*w,y*h+21,'#94afbc',8,'center');});
  const a=pts[i],b=pts[i+1],x=(a[0]+(b[0]-a[0])*f)*w,y=(a[1]+(b[1]-a[1])*f)*h;
  c.save();c.translate(x,y);c.rotate(Math.atan2((b[1]-a[1])*h,(b[0]-a[0])*w));
  c.fillStyle=color;c.beginPath();c.moveTo(13,0);c.lineTo(-8,-8);c.lineTo(-3,0);c.lineTo(-8,8);c.closePath();c.fill();c.restore();
  label(c,travel?'VOICE → ITINERARY → ASSISTANCE':'AUTONOMOUS FLIGHT / SIMULATION',20,25,'#8bafbe',9);
  rect(c,20,h-36,w-40,22,'#182c38',3);label(c,travel?'ACCESSIBLE BY DESIGN':'TELEMETRY  ·  AGENT 01  ·  ROUTE ACTIVE',w/2,h-21,color,8,'center');
}

function mapArt(c,w,h,t,p,color){
  // Abstract islands deliberately avoid representing real conflict locations.
  for(let j=0;j<10;j++)for(let i=0;i<22;i++){
    const n=Math.sin(i*.6+j*.3)+Math.cos(j*.7-i*.4)+Math.sin(i*.9-j*.6);
    if(n>.3)rect(c,25+i*(w-50)/22,30+j*(h-67)/10,9,8,n>1.4?'#34414f':'#263642',2);
  }
  const spots=[[.25,.38],[.55,.29],[.73,.59],[.43,.7]];
  spots.forEach(([x,y],i)=>{if(i/4>p)return;dot(c,x*w,y*h,4,color);c.strokeStyle=color+'55';c.beginPath();c.arc(x*w,y*h,8+((t+i)%2)*7,0,Math.PI*2);c.stroke();});
  label(c,'ABSTRACT MAP / SAMPLE SIGNALS',20,20,'#a49ab6',9);
  line(c,30,h-22,w-30,h-22,'#514258',2);dot(c,30+(w-60)*((t*.07)%1),h-22,4,color);
}

function terminal(c,x,y,w,t,color,side){
  rect(c,x,y,w,74,'#14212b',5);outline(c,x,y,w,74,'#334350',5);
  label(c,side==='left'?'~/ build':'~/ verify',x+10,y+16,'#7d91a5',8);
  for(let i=0;i<4;i++){rect(c,x+10,y+28+i*9,5,2,color);rect(c,x+20,y+28+i*9,18+((i*23+Math.floor(t)*7)%Math.max(20,w-44)),2,i===2?color:'#3b515f');}
  rect(c,x+w/2-6,y+74,12,12,'#283945');rect(c,x+w/2-24,y+85,48,3,'#415261',1);
}

export function renderScene(c,state,project,width=960,height=500){
  const mobile=height/width>.8,W=mobile?540:960,H=mobile?610:500;
  c.save();c.scale(width/W,height/H);
  rect(c,0,0,W,H,'#111a23');
  const glow=c.createRadialGradient(W/2,H*.39,12,W/2,H*.39,W*.6);
  glow.addColorStop(0,'#1c303d77');glow.addColorStop(1,'#111a2300');rect(c,0,0,W,H,glow);
  for(let i=0;i<50;i++)dot(c,((i*163+73)%W),20+((i*83)%(H-100)),i%5?0.7:1,'#506c803f');
  const floor=mobile?500:412;
  line(c,22,floor+24,W-22,floor+24,'#2a3b45');
  for(let i=0;i<9;i++)line(c,W/2+(i-4)*60,floor+25,W/2+(i-4)*125,H,'#283a432f');
  for(let i=1;i<5;i++)line(c,22,floor+25+i*i*5,W-22,floor+25+i*i*5,'#283a4338');
  const mx=mobile?36:225,my=mobile?29:31,mw=mobile?468:510,mh=mobile?288:260;
  rect(c,mx-7,my-7,mw+14,mh+14,'#0a1119',12);outline(c,mx-7,my-7,mw+14,mh+14,'#344553',12);
  rect(c,mx,my,mw,mh,'#101d28',7);
  label(c,'LIVE PROJECT / '+project.name.toUpperCase(),mx+15,my+17,'#758fa1',8);
  dot(c,mx+mw-17,my+13,3,state.bug?'#e8b76c':project.color);
  c.save();c.beginPath();c.rect(mx+8,my+26,mw-16,mh-33);c.clip();c.translate(mx+8,my+26);
  const aw=mw-16,ah=mh-33;
  if(project.kind==='audio')audioArt(c,aw,ah,state.time,state.completion,project.color);
  if(project.kind==='graph')graphArt(c,aw,ah,state.time,state.completion,project.color);
  if(project.kind==='search')searchArt(c,aw,ah,state.time,state.completion,project.color);
  if(project.kind==='flight'||project.kind==='travel')flightArt(c,aw,ah,state.time,state.completion,project.color,project.kind==='travel');
  if(project.kind==='map')mapArt(c,aw,ah,state.time,state.completion,project.color);
  c.restore();
  rect(c,W/2-16,my+mh+7,32,14,'#283d48');rect(c,W/2-65,my+mh+20,130,4,'#3b5260',2);
  if(!mobile){terminal(c,53,267,119,state.time,'#d19a79','left');terminal(c,W-172,267,119,state.time,'#94a6ef','right');}
  const cy=mobile?472:floor+5,clx=mobile?130:325,cox=mobile?410:635;
  const phaseText=state.bug?'A tiny bug. Lend a hand?':state.phase===3?'Another little world, shipped.':state.phase===2?'Checking the finishing touches…':state.phase===0?'A fresh idea on the workbench.':'A little progress, one line at a time.';
  const by=mobile?356:330;
  rect(c,W/2-(mobile?190:188),by-19,mobile?380:376,32,state.bug?'#33281e':'#1b2a33',6);
  label(c,phaseText,W/2,by+1,state.bug?'#ebc48c':'#a8bfcd',mobile?11:10,'center');
  robot(c,clx,cy,'claude',state.time,state.leader!=='codex',state.bug);
  robot(c,cox,cy,'codex',state.time,state.leader!=='claude',state.bug);
  const px=state.joined?38+state.player.x*(W-76):W/2;
  human(c,px,cy+11,state.time,state.player,state.joined);
  if(state.spark>0){for(let i=0;i<14;i++){const a=i*.45,dist=(1-state.spark)*95+15;rect(c,W/2+Math.cos(a)*dist,by+Math.sin(a)*dist,3,3,project.color);}}
  if(state.phase===3){for(let i=0;i<28;i++){const x=(i*83+30)%W,y=(state.time*45+i*37)%(floor-35);rect(c,x,y,3+(i%2),5,['#8cd3af','#ddb184','#94a6ed'][i%3]);}}
  if(!mobile){label(c,'EST. 2026  /  A LITTLE ROOM FOR BIG IDEAS',32,H-22,'#50687b',8);label(c,'CLICK THE SCENE TO HELP',W-32,H-22,'#647b8d',8,'right');}
  c.restore();
}
