'use strict';
const $=s=>document.querySelector(s),levels={easy:6,medium:8,hard:12};
let level='easy',cards=[],engine,matched=0,moves=0,started=null,finished=false,missTimer=null,winTimer=null,records={};
try{const saved=JSON.parse(localStorage.getItem('memory-flip.best.v1')||'{}');for(const k of Object.keys(levels))if(Number.isInteger(saved[k])&&saved[k]>=levels[k])records[k]=saved[k];}catch{}
function seconds(){return started===null?0:Math.floor((performance.now()-started)/1000);}
function time(n){return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');}
function reset(){
 clearTimeout(missTimer);clearTimeout(winTimer);$('#win').close();started=null;finished=false;matched=moves=0;
 cards=Memory.deck(levels[level]);engine=Memory.game(cards);$('#board').classList.toggle('hard',level==='hard');$('#board').replaceChildren();
 cards.forEach((symbol,index)=>{const b=document.createElement('button');b.className='card';b.dataset.index=index;b.setAttribute('aria-label','Card '+(index+1)+', face down');
 const inner=document.createElement('span');inner.className='card-inner';inner.setAttribute('aria-hidden','true');
 const back=document.createElement('span');back.className='face back';const star=document.createElement('span');star.textContent='✦';back.append(star);
 const front=document.createElement('span');front.className='face front';front.textContent=Memory.symbols[symbol][0];inner.append(back,front);b.append(inner);$('#board').append(b);});
 $('#moves').textContent='0';$('#time').textContent='00:00';$('#pairs').textContent='0 / '+levels[level];$('#best').textContent=records[level]??'—';$('#status').textContent='Pick a card to begin.';
 document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.level===level)));
}
function node(i){return $('#board').children[i];}
$('#board').onclick=e=>{
 const b=e.target.closest('.card');if(!b||finished)return;const index=Number(b.dataset.index),event=engine.pick(index);if(!event)return;
 if(started===null)started=performance.now();
 b.classList.add('flipped');b.setAttribute('aria-label','Card '+(index+1)+', '+Memory.symbols[cards[index]][1]);
 if(event.type==='first'){$('#status').textContent='Choose one more card.';return;}
 moves=event.moves;$('#moves').textContent=moves;
 if(event.type==='match'){matched++;event.indices.forEach(i=>{node(i).classList.add('matched');node(i).setAttribute('aria-label','Card '+(i+1)+', '+Memory.symbols[cards[i]][1]+', matched');node(i).setAttribute('aria-disabled','true');});$('#pairs').textContent=matched+' / '+levels[level];$('#status').textContent='A match! '+matched+' of '+levels[level]+' pairs found.';
 if(event.done)win();
 }else{$('#status').textContent='Not a pair. Remember these two.';missTimer=setTimeout(()=>{engine.settle().forEach(i=>{node(i).classList.remove('flipped');node(i).setAttribute('aria-label','Card '+(i+1)+', face down');});$('#status').textContent='Try another pair.';},1000);}
};
function win(){
 finished=true;const elapsed=seconds();$('#time').textContent=time(elapsed);const record=!records[level]||moves<records[level];
 if(record){records[level]=moves;try{localStorage.setItem('memory-flip.best.v1',JSON.stringify(records));}catch{$('#storage-note').textContent='Browser storage is unavailable. Your best score may not persist.';}}
 $('#best').textContent=records[level];$('#status').textContent='All pairs found! '+moves+' moves in '+time(elapsed)+'.';
 $('#win-summary').textContent=levels[level]+' pairs found in '+moves+' moves and '+time(elapsed)+'.';$('#record').textContent=record?'A new personal best for '+level+' mode.':'Your best for '+level+' mode: '+records[level]+' moves.';
 winTimer=setTimeout(()=>$('#win').showModal(),500);
}
$('#difficulty').onclick=e=>{const b=e.target.closest('[data-level]');if(b){level=b.dataset.level;reset();}};
$('#restart').onclick=reset;$('#again').onclick=()=>{reset();node(0).focus();};$('#view-board').onclick=()=>$('#win').close();
$('#help').onclick=()=>$('#instructions').showModal();$('#close-help').onclick=()=>$('#instructions').close();
setInterval(()=>{if(started!==null&&!finished)$('#time').textContent=time(seconds());},200);
reset();
