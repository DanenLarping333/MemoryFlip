const assert=require('node:assert/strict'),M=require('./core.js');
for(const n of [6,8,12]){const d=M.deck(n);assert.equal(d.length,n*2);for(let i=0;i<n;i++)assert.equal(d.filter(x=>x===i).length,2);}
assert.throws(()=>M.deck(13));
const g=M.game([0,1,0,1]);
assert.equal(g.pick(-1),null);
assert.equal(g.pick(0).type,'first');
assert.equal(g.pick(0),null);
assert.equal(g.pick(1).type,'miss');
assert.equal(g.pick(2),null);
assert.deepEqual(g.settle(),[0,1]);
assert.equal(g.pick(0).type,'first');
assert.deepEqual(g.pick(2),{type:'match',indices:[0,2],moves:2,done:false});
assert.equal(g.pick(0),null);
g.pick(1);
assert.deepEqual(g.pick(3),{type:'match',indices:[1,3],moves:3,done:true});
assert.equal(g.pick(3),null);
console.log('Passed: all deck sizes, duplicate clicks, mismatch lock, reset lock, matched cards and win scoring.');
