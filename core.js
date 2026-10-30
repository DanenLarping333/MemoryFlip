(function(root){
 const symbols=[['🍋','Lemon'],['🍒','Cherries'],['🥝','Kiwi'],['🍇','Grapes'],['🍓','Strawberry'],['🍊','Orange'],['🥑','Avocado'],['🍍','Pineapple'],['🍉','Watermelon'],['🍐','Pear'],['🫐','Blueberries'],['🥥','Coconut']];
 function deck(pairs,rng=Math.random){if(!Number.isInteger(pairs)||pairs<1||pairs>symbols.length)throw Error('Invalid pair count');const cards=Array.from({length:pairs},(_,i)=>[i,i]).flat();for(let i=cards.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}return cards;}
 function game(cards){let open=[],matched=new Set(),moves=0,locked=false;
 return {pick(index){if(!Number.isInteger(index)||index<0||index>=cards.length||locked||matched.has(index)||open.includes(index))return null;open.push(index);if(open.length===1)return {type:'first',indices:[index]};moves++;const indices=[...open];if(cards[open[0]]===cards[open[1]]){indices.forEach(i=>matched.add(i));open=[];return {type:'match',indices,moves,done:matched.size===cards.length};}locked=true;return {type:'miss',indices,moves};},
 settle(){if(!locked)return [];const old=open;open=[];locked=false;return old;}};}
 const api={symbols,deck,game};if(typeof module!=='undefined')module.exports=api;else root.Memory=api;
})(globalThis);
