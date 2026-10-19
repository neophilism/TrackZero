import test from 'node:test';import assert from 'node:assert/strict';
import {renderFanLibrary} from '../src/fan-library.mjs';
const grant={id:'g1',userId:'u1',title:'Rare <Take>',kind:'UNLOCKED_GROOVE',state:'ACTIVE',downloadAllowed:false};
test('renders escaped, distinct purchase and Groove entitlements without media URLs',()=>{
  const html=renderFanLibrary('u1',[grant,{...grant,id:'g2',kind:'PURCHASE',title:'Complete Album'}]);
  assert.match(html,/Rare &lt;Take&gt;/);assert.match(html,/unlocked groove/);
  assert.match(html,/live linear station/);assert.doesNotMatch(html,/https:|<audio/);
});
test('rejects cross-user, duplicate and revoked download grants',()=>{
  assert.throws(()=>renderFanLibrary('u2',[grant]));
  assert.throws(()=>renderFanLibrary('u1',[grant,grant]));
  assert.throws(()=>renderFanLibrary('u1',[{...grant,state:'REVOKED',downloadAllowed:true}]));
});
