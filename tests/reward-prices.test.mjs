import test from 'node:test';import assert from 'node:assert/strict';
import {defaultRewardPrice,rewardPreview,renderRewardPreview} from '../src/reward-prices.mjs';
test('base tier and linear factor use exact integer ceilings',()=>{
  assert.equal(defaultRewardPrice({base:'101',gentleBps:100,accelerationBps:0,tier:0}),101n);
  assert.equal(defaultRewardPrice({base:'101',gentleBps:100,accelerationBps:0,tier:1}),103n);
});
test('bounded exponential ladder grows and handles large integers',()=>{
  const config={base:'1000000000000',gentleBps:20,accelerationBps:20};
  const prices=[0,10,50,100].map(tier=>defaultRewardPrice({...config,tier}));
  assert.ok(prices.every((p,i)=>i===0||p>prices[i-1]));
  assert.ok(prices.at(-1)>BigInt(Number.MAX_SAFE_INTEGER));
});
test('rejects unbounded or malformed pricing settings',()=>{
  assert.throws(()=>defaultRewardPrice({base:'1e3',gentleBps:0,accelerationBps:0,tier:0}));
  assert.throws(()=>defaultRewardPrice({base:'1',gentleBps:0,accelerationBps:21,tier:100}));
  assert.throws(()=>defaultRewardPrice({base:'0',gentleBps:0,accelerationBps:0,tier:0}));
});
test('artist-specific snapshot never treats display as redemption',()=>{
  const offer={id:'r1',artistId:'a1',title:'Rare <Take>',version:7,cost:'999999999999999999',available:true};
  const view=rewardPreview(offer,{artistId:'a1',spendable:'1000000000000000000'});
  assert.equal(view.canRequest,true);
  const html=renderRewardPreview(view);assert.match(html,/Rare &lt;Take&gt;/);
  assert.match(html,/must recheck the offer and spend atomically/);
  assert.throws(()=>rewardPreview(offer,{artistId:'a2',spendable:'999999999999999999'}));
  assert.equal(rewardPreview({...offer,available:false},{artistId:'a1',spendable:view.balance}).canRequest,false);
});
