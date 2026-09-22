import test from 'node:test';
import assert from 'node:assert/strict';
import { Workshop } from '../public/arcade/engine.mjs';
import { projects } from '../public/arcade/projects.mjs';

const advance = (game,seconds,input) => {for(let i=0;i<seconds*20;i++)game.tick(.05,input);};

test('a full build completes without user input, including an automatically resolved bug',()=>{
  const g=new Workshop(6,()=>.5),first=g.index;
  advance(g,24);
  assert.equal(g.built,1);assert.ok(g.discovered.has(first));assert.equal(g.phase,3);
  advance(g,4);assert.notEqual(g.index,first);assert.equal(g.built,1);
});
test('a shuffled deck covers every project once and never repeats at its boundary',()=>{
  const g=new Workshop(6,()=>.999);let previous;
  for(let round=0;round<4;round++){
    const seen=new Set();
    for(let i=0;i<6;i++) {assert.notEqual(g.index,previous);seen.add(g.index);previous=g.index;g.next();}
    assert.equal(seen.size,6);
  }
});
test('pause freezes progress, movement, jumps, and assists',()=>{
  const g=new Workshop(1);g.joined=true;g.paused=true;
  const before=JSON.stringify(g);advance(g,10,{right:true});
  assert.equal(g.jump(),false);assert.equal(g.assist(),false);assert.equal(JSON.stringify(g),before);
});
test('assists resolve bugs, respect a cooldown, and do not award fake builds',()=>{
  const g=new Workshop(2);g.phase=1;g.bug=true;
  assert.equal(g.assist(),true);assert.equal(g.bug,false);assert.equal(g.assist(),false);
  assert.equal(g.built,0);assert.equal(g.assists,1);
  advance(g,1);assert.equal(g.assist(),true);
  g.phase=3;advance(g,1);assert.equal(g.assist(),false);
});
test('jump lands and player movement remains inside the stage',()=>{
  const g=new Workshop(1);g.joined=true;assert.ok(g.jump());g.tick(.1);
  assert.ok(g.player.y>0);assert.equal(g.jump(),false);
  advance(g,2,{right:true,run:true});assert.equal(g.player.y,0);assert.equal(g.player.x,.92);
  advance(g,5,{left:true});assert.equal(g.player.x,.08);
});
test('project switching resets a build and rejects invalid project IDs',()=>{
  const g=new Workshop(3);g.phase=1;g.progress=.7;g.bug=true;
  assert.ok(g.select(2));assert.equal(g.phase,0);assert.equal(g.progress,0);assert.equal(g.bug,false);
  assert.equal(g.select(-1),false);assert.equal(g.select(3),false);assert.equal(g.index,2);assert.equal(g.built,0);
});
test('catalog links only to the intended public GitHub repositories',()=>{
  assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);
  for(const p of projects){assert.equal(p.steps.length,4);assert.equal(new URL(p.url).hostname,'github.com');assert.ok(p.url.startsWith('https://github.com/gt12889/'));}
});
test('inactive tab time cannot fast-forward the simulation',()=>{
  const g=new Workshop(1);g.tick(10000);assert.ok(g.time<=.1);assert.equal(g.built,0);
  const before=g.time;g.tick(NaN);g.tick(-4);assert.equal(g.time,before);
});
