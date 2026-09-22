import { createCanvas } from '@napi-rs/canvas';
import gifenc from 'gifenc';
import { mkdir, writeFile } from 'node:fs/promises';
import { projects } from '../public/arcade/projects.mjs';
import { Workshop } from '../public/arcade/engine.mjs';
import { renderScene } from '../public/arcade/renderer.mjs';

const { GIFEncoder, quantize, applyPalette } = gifenc;
const width=768,height=480,canvas=createCanvas(width,height),c=canvas.getContext('2d');
const encoder=GIFEncoder(),game=new Workshop(projects.length,()=>.5);
await mkdir(new URL('../assets/',import.meta.url),{recursive:true});
for(let project=0;project<projects.length;project++){
  game.select(project);
  for(let frame=0;frame<24;frame++){
    game.time=project*3+frame/8;
    game.phase=frame>18?3:1;game.progress=frame/24;game.built=project;
    c.setTransform(.8,0,0,.8,0,0);
    c.fillStyle='#171f29';c.fillRect(0,0,960,600);
    c.font='14px monospace';c.fillStyle='#dfa27e';c.fillText('Claude',24,27);
    c.fillStyle='#8493a5';c.fillText('×',88,27);c.fillStyle='#a7b5ff';c.fillText('Codex',110,27);
    c.font='10px monospace';c.fillStyle='#a7b5c7';c.fillText('TUAN’S BUILD LAB',713,27);
    c.save();c.translate(0,44);renderScene(c,game,projects[project],960,500);c.restore();
    c.fillStyle='#293844';c.fillRect(0,548,960,1);
    c.font='13px monospace';c.fillStyle='#d8e3ed';c.fillText(projects[project].name,24,579);
    c.fillStyle='#a9d6ba';c.fillText('CLICK TO PLAY  →',779,579);
    const rgba=c.getImageData(0,0,width,height).data;
    const palette=quantize(rgba,128);
    encoder.writeFrame(applyPalette(rgba,palette),width,height,{palette,delay:125,repeat:0});
  }
}
encoder.finish();
const target=new URL('../assets/build-lab.gif',import.meta.url);
await writeFile(target,encoder.bytes());
console.log(`Rendered ${projects.length} project scenes to ${target.pathname} (${encoder.bytes().length} bytes).`);
